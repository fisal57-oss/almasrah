export * from './storage.js';

import { getHallBookings, saveHallBookings } from './storage.js';
import { prepareItganBooking } from './itganIntegration.js';

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
    itganUrl: prepared.itganUrl
  };
  bookings.unshift(newBooking);
  saveHallBookings(bookings);
  return { success: true, booking: newBooking, requestId: prepared.requestId, itganUrl: prepared.itganUrl };
}
