@echo off
chcp 65001 > nul
title نظام حجز مقاعد المسرح (Python Web App)
cls
echo.
echo ========================================================
echo        نظام حجز مقاعد المسرح والفعاليات (Python)
echo          جاري تشغيل خادم بايثون وفتح المتصفح...
echo ========================================================
echo.

cd /d "%~dp0"

if exist ".venv\Scripts\python.exe" (
    start "" "http://127.0.0.1:5000"
    ".venv\Scripts\python.exe" app.py
) else if exist "C:\Users\ACER\AppData\Local\Microsoft\WindowsApps\python.exe" (
    start "" "http://127.0.0.1:5000"
    uv run python app.py
) else (
    start "" "http://127.0.0.1:5000"
    python app.py
)

pause
