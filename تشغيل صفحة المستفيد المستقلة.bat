@echo off
chcp 65001 >nul
title صفحة المستفيد المستقلة - مسرح التعليم

echo ========================================================
echo   🎟️ فتح صفحة المستفيد والضيوف المستقلة
echo ========================================================
echo.

if exist "dist\beneficiary.html" (
    echo ❇️ جاري فتح صفحة المستفيد المستقلة في المتصفح...
    start "" "dist\beneficiary.html"
) else (
    echo ❇️ جاري تشغيل بناء الصفحة المستقلة ثم فتحها...
    call cmd /c "npm run build"
    start "" "dist\beneficiary.html"
)

echo.
echo ✅ تم فتح الصفحة المستقلة بنجاح!
echo 💡 يمكنك مشاركة ملف beneficiary.html أو رفعه على أي خادم ويب للمستفيدين.
echo.
pause
