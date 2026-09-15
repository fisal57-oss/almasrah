@echo off
chcp 65001 >nul
title تشغيل بوابة المستفيد المستقلة - مسرح التعليم

echo ========================================================
echo   🌐 تشغيل بوابة المستفيد والضيوف المستقلة
echo ========================================================
echo.

if exist "dist\beneficiary.html" (
    echo ❇️ جاري فتح الصفحة المستقلة للمستفيد...
    start "" "dist\beneficiary.html"
) else (
    echo ❇️ جاري فتح بوابة المستفيد في المتصفح...
    start http://localhost:3000/beneficiary.html
)

echo.
echo 📌 روابط الوصول المباشر عبر الويب والشبكة:
echo --------------------------------------------------------
echo  • رابط مباشر (خادم بايثون) : http://localhost:5000/beneficiary
echo  • رابط عبر الشبكة المحلية : http://127.0.0.1:5000/portal
echo  • رابط التطوير (Vite)     : http://localhost:3000/beneficiary.html
echo  • ملف محلي مستقل          : dist\beneficiary.html
echo --------------------------------------------------------
echo.
echo ✅ تم التشغيل بنجاح!
pause
