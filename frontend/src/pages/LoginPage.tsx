import { Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { buttons, fields, panel } from '../lib/styles';
import { useAuth } from '../state/AuthContext';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to login');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="grid min-h-[60vh] place-items-center">
      <form className={`${panel} grid w-full max-w-md gap-4 p-6`} onSubmit={handleSubmit}>
        <h1 className="font-serif text-4xl font-bold text-slate-950">Login</h1>
        {error && <p className="text-red-700">{error}</p>}
        <label className="grid gap-2 font-bold text-slate-600">
          Username
          <input
            className={fields}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="grid gap-2 font-bold text-slate-600">
          Password
          <div className="relative">
            <input
              className={`${fields} pr-12`}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-500"
              onClick={() => setShowPassword((current) => !current)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <button className={buttons.primary} disabled={submitting} type="submit">
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}
