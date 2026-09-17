@echo off
chcp 65001 > nul
title رفع المشروع إلى GitHub - مسرح التعليم
color 0B

echo =================================================================
echo        🚀 أداة رفع وتحديث المشروع على GitHub 🚀
echo =================================================================
echo.

:: Check if Git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] خطأ: برنامج Git غير مثبت على جهازك!
    echo يرجى تحميل وتثبيت Git من: https://git-scm.com/
    pause
    exit /b
)

:: Ensure git repo is initialized
if not exist ".git" (
    echo [*] جاري تهيئة مستودع Git...
    git init
    git branch -M main
)

:: Add and Commit all changes
echo [*] جاري إضافة وتجهيز الملفات...
git add .

set /p commit_msg="أدخل وصف التعديلات (أو اضغط Enter للافتراضي): "
if "%commit_msg%"=="" set commit_msg=تحديث نظام حجز مقاعد المسرح وبطاقات QR

git commit -m "%commit_msg%"

:: Check if remote origin exists
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo =================================================================
    echo [*] لم يتم ربط رابط المستودع على GitHub بعد.
    echo أنشئ مستودعاً جديداً على https://github.com/new
    echo ثم الصق رابط المستودع هنا (مثال: https://github.com/username/repo.git)
    echo =================================================================
    echo.
    set /p repo_url="الصق رابط المستودع (GitHub URL): "
    if not "%repo_url%"=="" (
        git remote add origin %repo_url%
        git branch -M main
    )
)

echo.
echo [*] جاري الرفع إلى GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =================================================================
    echo  ✅ تم رفع المشروع بنجاح إلى مستودع GitHub!
    echo =================================================================
) else (
    echo.
    echo [!] إذا واجهت مشكلة في الصلاحيات، تأكد من تسجيل دخولك في Git أو استخدم Personal Access Token.
)

echo.
pause
