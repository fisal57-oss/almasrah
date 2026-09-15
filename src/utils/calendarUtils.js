/**
 * Calendar and Location Utilities for Theater Seat Booking System
 */

// Generate .ics file content for Apple Calendar, Outlook, and Google Calendar
export function generateIcsCalendarFile(eventDetails, seat) {
  const title = eventDetails?.eventName || 'فعالية مسرح التعليم';
  const location = `${eventDetails?.hallName || 'مسرح الإدارة العامة للتعليم'} - مقعد ${seat ? `${seat.row}-${seat.number}` : ''}`;
  const description = `تذكرة حضور فعالية: ${title}\\nالمقعد: ${seat ? `${seat.row}-${seat.number} (${seat.level === 'B' ? 'البلكونة' : 'الدور الأرضي'})` : ''}\\nالضيف: ${seat?.guest?.name || ''}\\nيرجى إبراز التذكرة عند الدخول.`;
  
  // Parse date and time if available
  const eventDateStr = eventDetails?.eventDate || new Date().toISOString().split('T')[0];
  const dateClean = eventDateStr.replace(/-/g, '');
  
  const startTime = '160000Z'; // default 4:00 PM UTC
  const endTime = '190000Z';   // default 7:00 PM UTC
  const dtStart = `${dateClean}T${startTime}`;
  const dtEnd = `${dateClean}T${endTime}`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `ticket-${seat?.id || 'event'}-${Date.now()}@theater.edu.sa`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ministry of Education//Theater Seat Manager//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'DESCRIPTION:تذكير ببدء فعالية المسرح بعد ساعتين',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${title.replace(/\s+/g, '_')}_تذكرة.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate Google Calendar Add URL
export function getGoogleCalendarUrl(eventDetails, seat) {
  const title = encodeURIComponent(eventDetails?.eventName || 'فعالية مسرح التعليم');
  const location = encodeURIComponent(`${eventDetails?.hallName || 'مسرح الإدارة العامة للتعليم'} - مقعد ${seat ? `${seat.row}-${seat.number}` : ''}`);
  const details = encodeURIComponent(`تذكرة حضور: ${eventDetails?.eventName}\\nالمقعد: ${seat ? `${seat.row}-${seat.number}` : ''}\\nالاسم: ${seat?.guest?.name || ''}`);
  
  const dateStr = (eventDetails?.eventDate || new Date().toISOString().split('T')[0]).replace(/-/g, '');
  const dates = `${dateStr}T160000Z/${dateStr}T190000Z`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

// Generate Google Maps Directions URL
export function getGoogleMapsUrl(locationQuery) {
  const query = encodeURIComponent(locationQuery || 'الإدارة العامة للتعليم بمنطقة عسير مسرح');
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
