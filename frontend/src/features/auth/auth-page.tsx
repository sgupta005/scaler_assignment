import { useState } from 'react';
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="  flex items-center justify-center py-8">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-sm flex overflow-hidden min-h-[480px]">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white w-[40%] p-8 pb-0 shrink-0">
          <div>
            <h1 className="text-3xl font-bold leading-tight">
              {mode === 'login' ? 'Login' : "Looks like\nyou're new here!"}
            </h1>
            <p className="mt-4 text-blue-100 text-sm leading-relaxed">
              {mode === 'login'
                ? 'Get access to your Orders, Wishlist and Recommendations'
                : 'Sign up with your email & mobile number to get started'}
            </p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-end">
            <img
              src="/login-illustration.png"
              alt="illustration"
              className="w-48 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Fallback SVG illustration */}
            <div className="relative w-44 h-44 mb-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-28 bg-blue-400/30 rounded-t-full" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-20 bg-white/20 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 80 60" className="w-16 h-12" fill="none">
                  <rect
                    x="5"
                    y="5"
                    width="70"
                    height="50"
                    rx="4"
                    fill="white"
                    fillOpacity="0.9"
                  />
                  <circle cx="40" cy="28" r="12" fill="#c5cae9" />
                  <path d="M28 48 Q40 36 52 48" fill="#c5cae9" />
                </svg>
              </div>
              <div className="absolute top-2 right-4 w-10 h-10 bg-yellow-300 rounded-full opacity-80" />
              <div className="absolute top-8 left-2 w-6 h-6 bg-red-400 rounded-sm opacity-70" />
            </div>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          {mode === 'login' ? (
            <LoginForm onSwitch={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitch={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
}
