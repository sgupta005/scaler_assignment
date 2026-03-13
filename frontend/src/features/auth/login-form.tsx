import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { login } from '../../api/auth';
import { useAuth } from '../../context/auth-context';
import { useNavigate } from 'react-router';

interface LoginFormProps {
  onSwitch: () => void;
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, user } = await login({ identifier, password });
      setAuth(token, user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
        <p className="text-sm text-gray-500 mt-1">
          Get access to your Orders, Wishlist and Recommendations
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email / Mobile number</label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Enter Email or Mobile number"
          required
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
            placeholder="Enter your password"
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
        Login
      </button>

      <button
        type="button"
        onClick={onSwitch}
        className="text-center text-sm text-blue-600 font-medium hover:underline"
      >
        New to Flipkart? Create an account
      </button>
    </form>
  );
}
