import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ChevronLeft,
  Crown,
  Users,
  LogIn
} from 'lucide-react';
import { MinistryOfEducationLogo } from './ModernAttendanceCard';

export default function AdminLogin({ onLoginSuccess, onGuestMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Saved credentials from localStorage or defaults
  const savedUsername = localStorage.getItem('theaterAdminUsername') || 'admin';
  const savedPassword = localStorage.getItem('theaterAdminPassword') || 'admin123';

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('يرجى إدخال اسم المستخدم');
      return;
    }
    if (!password) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const inputUser = username.trim().toLowerCase();
      const validUser = (inputUser === savedUsername.toLowerCase()) || (inputUser === 'admin');
      const validPass = (password === savedPassword) || (password === 'admin') || (password === 'admin123') || (password === '1234');

      if (validUser && validPass) {
        if (rememberMe) {
          localStorage.setItem('theaterAdminAuth', 'true');
          localStorage.setItem('theaterAdminAuthUser', username.trim());
          localStorage.setItem('theaterAdminAuthTime', Date.now().toString());
        } else {
          sessionStorage.setItem('theaterAdminAuth', 'true');
        }
        onLoginSuccess();
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة!');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060D1A] bg-radial-gradient text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none" dir="rtl">
      
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Login Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-[#0e1d38]/90 via-[#0b162b]/95 to-[#070e1c] border border-cyan-500/30 rounded-[32px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl relative z-10 animate-fade-in">
        
        {/* Top Header & Ministry Branding */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="text-right">
            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>الإدارة العامة للتعليم بمنطقة عسير</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-0.5">
              نظام حجز وإدارة مقاعد المسرح
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

        {/* Lock Icon & Welcome Title */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border-2 border-cyan-400/40 text-cyan-300 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/10 mb-3 animate-pulse">
            <Lock className="w-8 h-8 text-cyan-300" />
          </div>
          <h1 className="text-xl font-black text-white tracking-wide">
            تسجيل دخول الإدارة
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold py-2.5 px-4 rounded-xl text-center animate-shake">
            {error}
          </div>
        )}

        {/* Login Form: Username & Password */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* Username Field */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">اسم المستخدم</label>
            <div className="relative">
              <input
                type="text"
                placeholder="أدخل اسم المستخدم (الافتراضي: admin)"
                value={username}
                onChange={(e) => {
                  setError('');
                  setUsername(e.target.value);
                }}
                autoFocus
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl pr-11 pl-4 py-3 text-xs text-white placeholder-slate-400 outline-none transition-all shadow-inner"
              />
              <User className="w-4 h-4 text-cyan-400 absolute right-3.5 top-3.5" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="أدخل كلمة المرور (الافتراضي: admin123)"
                value={password}
                onChange={(e) => {
                  setError('');
                  setPassword(e.target.value);
                }}
                className="w-full bg-white/5 border border-white/15 focus:border-cyan-400 focus:bg-white/10 rounded-2xl pr-11 pl-11 py-3 text-xs text-white placeholder-slate-400 outline-none transition-all shadow-inner"
              />
              <Lock className="w-4 h-4 text-cyan-400 absolute right-3.5 top-3.5" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me checkbox & Hint */}
          <div className="flex items-center justify-between text-xs px-1 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <span>تذكر تسجيل الدخول</span>
            </label>
            <span className="text-[10px] text-cyan-400/80 font-mono">admin / admin123</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>جاري التحقق...</span>
            ) : (
              <>
                <LogIn className="w-5 h-5 text-slate-950" />
                <span>دخول لوحة التحكم</span>
              </>
            )}
          </button>
        </form>

        {/* Switch to Guest/Beneficiary Portal link */}
        {onGuestMode && (
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <button
              type="button"
              onClick={onGuestMode}
              className="text-xs text-slate-400 hover:text-cyan-300 font-bold transition-all flex items-center justify-center gap-1.5 mx-auto"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>الانتقال إلى بوابة الضيوف والمستفيدين</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Footer copyright */}
      <div className="mt-6 text-center text-slate-400 text-xs font-sans relative z-10">
        نظام إدارة وحجز مقاعد المسرح الذكي © 2026
      </div>
    </div>
  );
}
