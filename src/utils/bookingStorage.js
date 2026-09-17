export * from './storage.js';

import { getHallBookings, saveHallBookings } from './storage.js';
import { prepareItganBooking } from './itganIntegration.js';

const API_CONFIG_KEY = 'almasrah_integration_api_url';

function getIntegrationApiUrl() {
  try {
    return (localStorage.getItem(API_CONFIG_KEY) || '').trim();
  } catch (_) {
    return '';
  }
}

function apiPayload(booking) {
  return {
    requestId: booking.requestId,
    eventId: booking.eventId || null,
    source: booking.source || 'almasrah-beneficiary',
    status: booking.status || 'pending',
    orgName: booking.orgName || '',
    contactName: booking.contactName || '',
    phone: booking.phone || '',
    eventTitle: booking.eventTitle || '',
    bookingDate: booking.bookingDate || '',
    timeSlot: booking.timeSlot || '',
    venueId: booking.venueId || '',
    venueName: booking.venueName || '',
    venueLocation: booking.venueLocation || '',
    expectedAttendees: booking.expectedAttendees || 0,
    equipments: booking.equipments || [],
    notes: booking.notes || ''
  };
}

async function pushBookingToSharedApi(booking) {
  const apiUrl = getIntegrationApiUrl();
  if (!apiUrl) return { success: false, skipped: true, reason: 'api_not_configured' };
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiPayload(booking))
  });
  if (!response.ok) throw new Error(`Integration API HTTP ${response.status}`);
  return response.json();
}

export function submitHallBooking(requestData = {}) {
  const bookings = getHallBookings();
  const prepared = prepareItganBooking(requestData);
  const createdAt = new Date().toISOString();
  const newBooking = {
    ...requestData,
    id: prepared.requestId,
    requestId: prepared.requestId,
    eventId: requestData.eventId || null,
    createdAt,
    updatedAt: createdAt,
    status: 'pending',
    source: 'almasrah-beneficiary',
    integration: prepared.integration,
    itganUrl: prepared.itganUrl,
    syncStatus: getIntegrationApiUrl() ? 'syncing' : 'local-only'
  };
  bookings.unshift(newBooking);
  saveHallBookings(bookings);

  if (getIntegrationApiUrl()) {
    pushBookingToSharedApi(newBooking)
      .then(() => markBookingSync(newBooking.requestId, 'synced'))
      .catch((error) => {
        console.error('Shared booking sync failed:', error);
        markBookingSync(newBooking.requestId, 'failed');
      });
  }

  return { success: true, booking: newBooking, requestId: prepared.requestId, itganUrl: prepared.itganUrl };
}

function markBookingSync(requestId, syncStatus) {
  const bookings = getHallBookings();
  const updated = bookings.map((b) => b.requestId === requestId ? { ...b, syncStatus, updatedAt: new Date().toISOString() } : b);
  saveHallBookings(updated);
}

export async function refreshHallBookingStatus(requestId) {
  const apiUrl = getIntegrationApiUrl();
  if (!apiUrl || !requestId) return null;
  const url = new URL(apiUrl);
  url.searchParams.set('requestId', requestId);
  const response = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
  if (!response.ok) return null;
  const data = await response.json();
  const remote = data.request;
  if (!remote) return null;
  const bookings = getHallBookings();
  const updated = bookings.map((b) => b.requestId === requestId ? {
    ...b,
    status: remote.status || b.status,
    eventId: remote.event_id || b.eventId || null,
    syncStatus: 'synced',
    updatedAt: remote.updated_at || new Date().toISOString()
  } : b);
  saveHallBookings(updated);
  return updated.find((b) => b.requestId === requestId) || null;
}

export function configureIntegrationApi(url) {
  const clean = String(url || '').trim();
  if (clean) localStorage.setItem(API_CONFIG_KEY, clean);
  else localStorage.removeItem(API_CONFIG_KEY);
  return clean;
}
