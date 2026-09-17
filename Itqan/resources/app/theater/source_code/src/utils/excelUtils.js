import * as XLSX from 'xlsx';

/**
 * Export all seats and guest bookings to a styled Excel (.xlsx) workbook
 */
export function exportSeatsToExcel(seats, eventDetails = {}) {
  try {
    const data = seats.map((seat, index) => {
      const isReserved = seat.status === 'reserved' || seat.status === 'checked_in';
      const guest = seat.guest || {};
      
      const levelTitle = seat.level === 'B' ? 'الدور الثاني (البلكونة)' : 'الدور الأرضي';
      const statusTitle = seat.status === 'checked_in' 
        ? 'تم الدخول (حاضر)' 
        : seat.status === 'reserved' 
        ? 'مؤكد الحجز' 
        : 'شاغر / متاح';

      const origin = window.location.origin + window.location.pathname;
      const guestLink = guest.token ? `${origin}?invitation=${guest.token}` : '';

      return {
        'م': index + 1,
        'الدور': levelTitle,
        'القطاع': seat.sector || 'الوسط',
        'الصف': seat.row,
        'رقم المقعد': String(seat.number).padStart(2, '0'),
        'رمز المقعد': `${seat.row}${String(seat.number).padStart(2, '0')}`,
        'فئة المقعد': seat.isVip ? 'VIP كبار الشخصيات' : 'عادي',
        'حالة المقعد': statusTitle,
        'اسم الضيف': isReserved ? (guest.name || '—') : '',
        'الصفة / المنصب': isReserved ? (guest.jobTitle || '—') : '',
        'الفئة / الجهة': isReserved ? (guest.category || 'عام') : '',
        'رقم الجوال': isReserved ? (guest.phone || '—') : '',
        'وقت تأكيد الحضور': guest.checkedInAt ? new Date(guest.checkedInAt).toLocaleTimeString('ar-SA') : '—',
        'رابط التذكرة والباركود': guestLink,
        'رمز التوكن': guest.token || ''
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Set columns width
    worksheet['!cols'] = [
      { wch: 5 },  // م
      { wch: 20 }, // الدور
      { wch: 12 }, // القطاع
      { wch: 8 },  // الصف
      { wch: 12 }, // رقم المقعد
      { wch: 12 }, // رمز المقعد
      { wch: 18 }, // فئة المقعد
      { wch: 18 }, // حالة المقعد
      { wch: 25 }, // اسم الضيف
      { wch: 22 }, // الصفة / المنصب
      { wch: 18 }, // الفئة
      { wch: 15 }, // الجوال
      { wch: 18 }, // وقت الحضور
      { wch: 45 }, // الرابط
      { wch: 15 }  // التوكن
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'كشف مقاعد وضيوف المسرح');

    const fileName = `كشف_مقاعد_المسرح_${(eventDetails.title || 'الفعالية').replace(/[\/\\?%*:|"<>]/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    return { success: true, fileName };
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    // Fallback to CSV if xlsx fails
    exportSeatsToCSV(seats, eventDetails);
    return { success: true, isCsvFallback: true };
  }
}

/**
 * Fallback CSV export with UTF-8 BOM for full Arabic Excel support
 */
export function exportSeatsToCSV(seats, eventDetails = {}) {
  const headers = [
    'م', 'الدور', 'القطاع', 'الصف', 'رقم المقعد', 'رمز المقعد',
    'فئة المقعد', 'حالة المقعد', 'اسم الضيف', 'المنصب', 'الفئة',
    'رقم الجوال', 'تاريخ ووقت التحضير', 'رابط التذكرة'
  ];

  const origin = window.location.origin + window.location.pathname;

  const rows = seats.map((seat, index) => {
    const isReserved = seat.status === 'reserved' || seat.status === 'checked_in';
    const guest = seat.guest || {};
    const levelTitle = seat.level === 'B' ? 'الدور الثاني' : 'الدور الأرضي';
    const statusTitle = seat.status === 'checked_in' ? 'تم الدخول' : seat.status === 'reserved' ? 'محجوز' : 'متاح';
    const guestLink = guest.token ? `${origin}?invitation=${guest.token}` : '';

    return [
      index + 1,
      `"${levelTitle}"`,
      `"${seat.sector || 'الوسط'}"`,
      `"${seat.row}"`,
      `"${seat.number}"`,
      `"${seat.row}${seat.number}"`,
      `"${seat.isVip ? 'VIP' : 'عادي'}"`,
      `"${statusTitle}"`,
      `"${isReserved ? (guest.name || '') : ''}"`,
      `"${isReserved ? (guest.jobTitle || '') : ''}"`,
      `"${isReserved ? (guest.category || '') : ''}"`,
      `"${isReserved ? (guest.phone || '') : ''}"`,
      `"${guest.checkedInAt ? new Date(guest.checkedInAt).toLocaleString('ar-SA') : ''}"`,
      `"${guestLink}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `كشف_حضور_المسرح_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Parses an uploaded Excel (.xlsx, .xls) or CSV file and extracts guest entries
 */
export async function parseGuestFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          throw new Error('الملف فارغ أو لا يحتوي على بيانات صالحة');
        }

        // Map various column name variations in Arabic and English
        const parsedGuests = rawJson.map((row, idx) => {
          // Look for name
          const name = row['اسم الضيف'] || row['الاسم'] || row['اسم'] || row['Name'] || row['name'] || row['Guest Name'] || Object.values(row)[0] || '';
          
          // Look for job title
          const jobTitle = row['الصفة / المنصب'] || row['المنصب'] || row['الصفة'] || row['المسمى الوظيفي'] || row['الوظيفة'] || row['Job Title'] || row['title'] || '';
          
          // Look for category / organization
          const category = row['الفئة / الجهة'] || row['الفئة'] || row['الجهة'] || row['القسم'] || row['Category'] || row['Organization'] || 'عام';
          
          // Look for phone
          const phone = row['رقم الجوال'] || row['الجوال'] || row['الهاتف'] || row['Phone'] || row['mobile'] || '';

          // Look for VIP preference or preferred row/seat
          const isVipRaw = row['فئة المقعد'] || row['VIP'] || row['vip'] || '';
          const isVip = String(isVipRaw).toLowerCase().includes('vip') || String(isVipRaw).includes('كبار');
          
          const preferredRow = row['الصف المفضل'] || row['الصف'] || row['Row'] || '';
          const preferredSeat = row['رقم المقعد'] || row['المقعد'] || row['Seat'] || '';

          return {
            id: `import_${Date.now()}_${idx}`,
            name: String(name).trim(),
            jobTitle: String(jobTitle).trim(),
            category: String(category).trim(),
            phone: String(phone).trim(),
            isVip,
            preferredRow: preferredRow ? String(preferredRow).toUpperCase().trim() : '',
            preferredSeat: preferredSeat ? parseInt(preferredSeat, 10) : null
          };
        }).filter(g => g.name.length > 0);

        resolve(parsedGuests);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Intelligently auto-assigns an imported guest list to available seats
 */
export function autoAssignGuestsToSeats(guestList, currentSeats) {
  const seatsCopy = JSON.parse(JSON.stringify(currentSeats));
  const assigned = [];
  const unassigned = [];

  // Index available seats
  const availableSeats = seatsCopy.filter(s => s.status === 'available');

  guestList.forEach((guest) => {
    let targetSeatIndex = -1;

    // 1. Try exact preferred row & seat if provided
    if (guest.preferredRow && guest.preferredSeat) {
      targetSeatIndex = seatsCopy.findIndex(
        s => s.status === 'available' && 
             s.row.toUpperCase() === guest.preferredRow && 
             parseInt(s.number, 10) === guest.preferredSeat
      );
    }

    // 2. Try preferred row only
    if (targetSeatIndex === -1 && guest.preferredRow) {
      targetSeatIndex = seatsCopy.findIndex(
        s => s.status === 'available' && s.row.toUpperCase() === guest.preferredRow
      );
    }

    // 3. If VIP, look for VIP seats first
    if (targetSeatIndex === -1 && guest.isVip) {
      targetSeatIndex = seatsCopy.findIndex(
        s => s.status === 'available' && s.isVip
      );
    }

    // 4. Default: Take the next available seat
    if (targetSeatIndex === -1) {
      targetSeatIndex = seatsCopy.findIndex(s => s.status === 'available');
    }

    if (targetSeatIndex !== -1) {
      const targetSeat = seatsCopy[targetSeatIndex];
      const token = 'TKT-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Date.now().toString(36).substring(4, 7).toUpperCase();

      targetSeat.status = 'reserved';
      targetSeat.guest = {
        name: guest.name,
        jobTitle: guest.jobTitle,
        category: guest.category,
        phone: guest.phone,
        bookedAt: new Date().toISOString(),
        token: token
      };

      assigned.push({
        guest,
        seat: targetSeat
      });
    } else {
      unassigned.push(guest);
    }
  });

  return {
    updatedSeats: seatsCopy,
    assignedCount: assigned.length,
    unassignedCount: unassigned.length,
    assigned,
    unassigned
  };
}
