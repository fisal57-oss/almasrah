export * from './storage.js';

import { getHallBookings, saveHallBookings } from './storage.js';
import { prepareItganBooking } from './itganIntegration.js';

const INTEGRATION_API_URL = 'https://qrytzuqlsvfsjukcvrdg.supabase.co/functions/v1/booking-requests';

function apiPayload(booking) {
  return {
    requestId: booking.requestId,
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
  const response = await fetch(INTEGRATION_API_URL, {
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
    syncStatus: 'syncing',
    trackingToken: null
  };
  bookings.unshift(newBooking);
  saveHallBookings(bookings);

  pushBookingToSharedApi(newBooking)
    .then((remote) => markBookingSync(newBooking.requestId, 'synced', remote.trackingToken || null))
    .catch((error) => {
      console.error('Shared booking sync failed:', error);
      markBookingSync(newBooking.requestId, 'failed');
    });

  return { success: true, booking: newBooking, requestId: prepared.requestId, itganUrl: prepared.itganUrl };
}

function markBookingSync(requestId, syncStatus, trackingToken = undefined) {
  const bookings = getHallBookings();
  const updated = bookings.map((b) => b.requestId === requestId ? {
    ...b,
    syncStatus,
    ...(trackingToken !== undefined ? { trackingToken } : {}),
    updatedAt: new Date().toISOString()
  } : b);
  saveHallBookings(updated);
}

export async function refreshHallBookingStatus(requestId) {
  if (!requestId) return null;
  const bookings = getHallBookings();
  const current = bookings.find((b) => b.requestId === requestId);
  if (!current?.trackingToken) return current || null;
  const url = new URL(INTEGRATION_API_URL);
  url.searchParams.set('requestId', requestId);
  url.searchParams.set('token', current.trackingToken);
  const response = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  if (!response.ok) return null;
  const data = await response.json();
  const remote = data.request;
  if (!remote) return null;
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

export const integrationApiUrl = INTEGRATION_API_URL;
