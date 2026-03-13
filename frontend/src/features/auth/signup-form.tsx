import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signup } from '../../api/auth';
import { useAuth } from '../../context/auth-context';
import { useNavigate, useSearchParams } from 'react-router';

interface SignupFormProps {
  onSwitch: () => void;
  onSuccess?: () => void;
}

export function SignupForm({ onSwitch, onSuccess }: SignupFormProps) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { name, email, password, ...(phone ? { phone } : {}) };
      const { token, user } = await signup(payload);
      setAuth(token, user);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectTo);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
        <p className="text-sm text-gray-500 mt-1">
          Sign up to start shopping on Flipkart
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm transition-colors placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm transition-colors placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Mobile Number <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your mobile number"
          className="border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm transition-colors placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password (min. 6 characters)"
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-sm transition-colors placeholder:text-gray-400 pr-8"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        By continuing, you agree to Flipkart's{' '}
        <span className="text-blue-600 cursor-pointer hover:underline">Terms of Use</span> and{' '}
        <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#fb641b] hover:bg-[#e85d18] text-white font-semibold py-3 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        Create Account
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="text-center text-sm text-blue-600 font-medium hover:underline"
      >
        Existing user? Login
      </button>
    </form>
  );
}
