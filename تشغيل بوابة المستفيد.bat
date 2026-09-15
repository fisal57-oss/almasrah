@echo off
chcp 65001 >nul
title تشغيل بوابة المستفيد والضيوف - مسرح التعليم

echo ========================================================
echo   🚀 تشغيل بوابة المستفيد والضيوف (واجهة مستقلة)
echo ========================================================
echo.

if exist "Portable-Beneficiary-App-Build\بوابة المستفيد والضيوف - مسرح التعليم-win32-x64\BeneficiaryPortalApp.exe" (
    echo ❇️ جاري تشغيل التطبيق المحمول...
    start "" "Portable-Beneficiary-App-Build\بوابة المستفيد والضيوف - مسرح التعليم-win32-x64\BeneficiaryPortalApp.exe"
) else (
    echo ❇️ جاري فتح المتصفح على بوابة المستفيد...
    start http://localhost:3000/?mode=beneficiary
)

echo.
echo ✅ تم التشغيل بنجاح!
pause
