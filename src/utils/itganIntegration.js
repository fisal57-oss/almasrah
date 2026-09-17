const ITGAN_BOOKING_URL = 'https://fisal57-oss.github.io/itgan/resources/app/booking_receiver.html';

function makeRequestId() {
  const now = new Date();
  const year = now.getFullYear();
  const stamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `REQ-${year}-${stamp}-${random}`;
}

export function normalizeItganBooking(requestData = {}) {
  const requestId = requestData.requestId || makeRequestId();
  return {
    requestId,
    eventId: requestData.eventId || null,
    status: requestData.status || 'pending',
    source: 'almasrah-beneficiary',
    applicant: {
      name: requestData.contactName || '',
      mobile: requestData.phone || '',
      department: requestData.orgName || ''
    },
    event: {
      title: requestData.eventTitle || '',
      date: requestData.bookingDate || '',
      timeSlot: requestData.timeSlot || '',
      venueId: requestData.venueId || '',
      venue: requestData.venueName || '',
      venueLocation: requestData.venueLocation || '',
      expectedGuests: requestData.expectedAttendees || 0,
      equipments: requestData.equipments || [],
      notes: requestData.notes || ''
    },
    createdAt: requestData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function buildItganBookingUrl(booking) {
  const payload = normalizeItganBooking(booking);
  const url = new URL(ITGAN_BOOKING_URL);
  url.searchParams.set('source', payload.source);
  url.searchParams.set('requestId', payload.requestId);
  url.searchParams.set('eventTitle', payload.event.title);
  url.searchParams.set('date', payload.event.date);
  url.searchParams.set('venue', payload.event.venue);
  url.searchParams.set('contactName', payload.applicant.name);
  url.searchParams.set('mobile', payload.applicant.mobile);
  url.searchParams.set('department', payload.applicant.department);
  if (payload.event.timeSlot) url.searchParams.set('timeSlot', payload.event.timeSlot);
  if (payload.event.expectedGuests) url.searchParams.set('expectedGuests', String(payload.event.expectedGuests));
  return url.toString();
}

export function prepareItganBooking(requestData = {}) {
  const integration = normalizeItganBooking(requestData);
  return {
    integration,
    requestId: integration.requestId,
    itganUrl: buildItganBookingUrl({ ...requestData, requestId: integration.requestId })
  };
}
