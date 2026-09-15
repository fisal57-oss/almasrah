@echo off
chcp 65001 >nul
title تشغيل نظام حجز مقاعد المسرح (PHP & SQL)

echo ========================================================
echo        نظام حجز مقاعد المسرح وبوابة المستفيد (PHP)
echo ========================================================
echo.

set PHP_BIN=php

if exist "C:\xampp\php\php.exe" (
    set PHP_BIN=C:\xampp\php\php.exe
) else if exist "C:\laragon\bin\php\php-8.2.0-Win32-vs16-x64\php.exe" (
    set PHP_BIN=C:\laragon\bin\php\php-8.2.0-Win32-vs16-x64\php.exe
) else if exist "C:\wamp64\bin\php\php8.2.0\php.exe" (
    set PHP_BIN=C:\wamp64\bin\php\php8.2.0\php.exe
)

echo ❇️ جاري تشغيل خادم PHP المحلي على المنفذ 8000...
start "" "http://127.0.0.1:8000/beneficiary.php"
%PHP_BIN% -S 127.0.0.1:8000
pause
