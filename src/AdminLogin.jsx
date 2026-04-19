import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './AppContext';
import { Eye, EyeOff, Globe, Lock, Mail, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail]       = useState('admin@esimconnect.com');
  const [password, setPassword] = useState('admin123');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { setIsLoggedIn }       = useApp();
  const navigate                = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 900));
    if (email === 'admin@esimconnect.com' && password === 'admin123') {
      setIsLoggedIn(true);
      navigate('/admin/dashboard');
    } else {
      setError('Neteisingas el. paštas arba slaptažodis.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 gradient-bg flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ width: Math.random()*80+20, height: Math.random()*80+20,
                top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random()*0.5 }} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Globe className="text-white" size={22} />
            </div>
            <span className="text-white text-xl font-bold">eSIM Connect</span>
          </div>
          <p className="text-white/60 text-sm">Admin Management Portal</p>
        </div>
        <div className="relative z-10 space-y-6">
          {[
            { icon: '📡', title: 'Global eSIM Network', desc: 'Manage plans across 190+ countries' },
            { icon: '⚡', title: 'Real-time Analytics',  desc: 'Live orders, KYC and revenue data'  },
            { icon: '🔒', title: 'Secure Platform',       desc: 'Enterprise-grade security & compliance' },
          ].map(f => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{f.icon}</div>
              <div>
                <div className="text-white font-semibold text-sm">{f.title}</div>
                <div className="text-white/60 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-10 flex items-center gap-2 text-white/40 text-xs">
          <Shield size={12} /> <span>© 2026 eSIM Connect. All rights reserved.</span>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="text-white" size={26} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Prisijungti prie Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Įveskite savo prisijungimo duomenis</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-4 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">El. paštas</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                  placeholder="admin@esimconnect.com" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 block">Slaptažodis</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-gray-50"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded" defaultChecked />
                Atsiminti mane
              </label>
              <a href="#" className="text-sm text-sky-600 hover:text-sky-700 font-medium">Pamiršote slaptažodį?</a>
            </div>
            <button type="submit" disabled={loading}
              className="w-full gradient-bg text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/><span>Jungiamasi...</span></>
              ) : 'Prisijungti'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium mb-1">Demo prisijungimas:</p>
            <p className="text-xs text-blue-600">Email: <span className="font-mono">admin@esimconnect.com</span></p>
            <p className="text-xs text-blue-600">Pass: <span className="font-mono">admin123</span></p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <a href="/" className="text-sky-600 hover:underline">← Grįžti į parduotuvę</a>
          </p>
        </div>
      </div>
    </div>
  );
}
