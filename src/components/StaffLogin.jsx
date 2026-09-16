import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  LogIn, 
  ArrowRight,
  Sparkles,
  QrCode,
  Users,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';
import { validateStaffLogin } from '../utils/storage';

export default function StaffLogin({ onLoginSuccess, onGuestMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    if (!cleanUser) {
      setError('يرجى إدخال اسم المستخدم');
      return;
    }
    if (!password) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = validateStaffLogin(cleanUser, password);
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('theaterStaffAuth', 'true');
          localStorage.setItem('theaterStaffAuthUser', JSON.stringify(result.user));
          localStorage.setItem('theaterStaffAuthTime', Date.now().toString());
        } else {
          sessionStorage.setItem('theaterStaffAuth', 'true');
          sessionStorage.setItem('theaterStaffAuthUser', JSON.stringify(result.user));
        }
        if (onLoginSuccess) {
          onLoginSuccess(result.user);
        }
      } else {
        setError(result.message || 'بيانات الدخول غير صحيحة');
        setIsSubmitting(false);
      }
    }, 400);
  };

  const handleFillDemoAccount = (demoUser, demoPass) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none font-sans" dir="rtl">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Login Card Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-[#0c1a33]/95 via-[#09152b]/95 to-[#060f21] border border-cyan-500/30 rounded-[32px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl relative z-10 animate-fade-in">
        
        {/* Top Header: Directorate Branding & Ministry Logo */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="text-right">
            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span>الإدارة العامة للتعليم بمنطقة عسير</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              بوابة المنظمين وموظفي الاستقبال
            </div>
          </div>

          <div className="h-9">
            <MinistryOfEducationLogo 
              className="h-9" 
              color="#ffffff" 
              textColor="#ffffff" 
              subColor="#94a3b8" 
            />
          </div>
        </div>

        {/* Shield Icon & Portal Title */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-2 border-cyan-400/40 text-cyan-300 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/10 mb-3 animate-pulse">
            <ShieldCheck className="w-8 h-8 text-cyan-300" />
          </div>
          <h1 className="text-xl font-black text-white tracking-wide">
            تسجيل دخول المنظمين
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            أدخل اسم المستخدم وكلمة المرور المسلمة لك لبدء مسح تذاكر الحضور
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-bold flex items-center gap-2 animate-shake shadow-lg">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-slate-300">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <input
                type="text"
                autoComplete="username"
                autoFocus
                placeholder="أدخل اسم المستخدم (مثال: gate1)..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl pr-11 pl-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner font-mono"
              />
              <User className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-slate-300">
              كلمة المرور (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="أدخل كلمة المرور..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl pr-11 pl-11 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner font-mono"
              />
              <Lock className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                title={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Option */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-cyan-400 bg-white/10 border-white/20 cursor-pointer"
              />
              <span>تذكر تسجيل الدخول على هذا الجهاز</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-98 flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4 text-slate-950" />
                <span>دخول البوابة والماسح</span>
              </>
            )}
          </button>

        </form>

        {/* Quick Demo Credentials for Fast Testing */}
        <div className="mt-6 pt-4 border-t border-white/10 text-right space-y-2">
          <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>حسابات تجريبية سريعة للمنظمين (انقر للتعبئة الفورية):</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleFillDemoAccount('gate1', 'gate123')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-all group"
            >
              <span className="block text-[10px] font-bold text-cyan-300 group-hover:text-cyan-200">بوابة 1</span>
              <span className="text-[9px] text-slate-400 font-mono">gate1</span>
            </button>

            <button
              type="button"
              onClick={() => handleFillDemoAccount('usher1', 'usher123')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-all group"
            >
              <span className="block text-[10px] font-bold text-amber-300 group-hover:text-amber-200">مرشد مقاعد</span>
              <span className="text-[9px] text-slate-400 font-mono">usher1</span>
            </button>

            <button
              type="button"
              onClick={() => handleFillDemoAccount('vip1', 'vip123')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-right transition-all group"
            >
              <span className="block text-[10px] font-bold text-purple-300 group-hover:text-purple-200">منظم VIP</span>
              <span className="text-[9px] text-slate-400 font-mono">vip1</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center pt-2">
            💡 يتم توليد وتعديل كافة الحسابات من خلال لوحة الإدارة العامة.
          </p>
        </div>

        {/* Guest Portal link */}
        {onGuestMode && (
          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <button
              type="button"
              onClick={onGuestMode}
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>الانتقال إلى بوابة الضيوف والمستفيدين</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
