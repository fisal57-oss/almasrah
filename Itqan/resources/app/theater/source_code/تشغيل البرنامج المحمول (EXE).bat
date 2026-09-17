@echo off
chcp 65001 > nul
title نظام حجز مقاعد المسرح - النسخة المحمولة
cls

cd /d "%~dp0"

if exist "Portable-App\نظام حجز مقاعد المسرح-win32-x64\TheaterSeatsApp.exe" (
    start "" "Portable-App\نظام حجز مقاعد المسرح-win32-x64\TheaterSeatsApp.exe"
) else (
    echo.
    echo ========================================================
    echo   جاري بناء النسخة المحمولة لأول مرة، يرجى الانتظار...
    echo ========================================================
    echo.
    call npm run portable
    start "" "Portable-App\نظام حجز مقاعد المسرح-win32-x64\TheaterSeatsApp.exe"
)
