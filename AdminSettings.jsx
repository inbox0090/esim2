import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import { Save, Eye, EyeOff, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminSettings() {
  const [stripeKey, setStripeKey] = useState('sk_test_••••••••••••••••••••••••');
  const [paypalKey, setPaypalKey] = useState('client_id_••••••••••••••');
  const [razorKey,  setRazorKey]  = useState('rzp_test_••••••••••');
  const [showKeys, setShowKeys]   = useState(false);
  const [env, setEnv]             = useState('test');
  const [commission, setCommission] = useState(15);
  const [notif, setNotif]         = useState(false);

  const save = () => { setNotif(true); setTimeout(() => setNotif(false), 2500); };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Nustatymai" subtitle="Mokėjimai, komisiniai ir branding" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

        {notif && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
            ✅ Nustatymai išsaugoti sėkmingai!
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">

          {/* Payment config */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">Mokėjimo konfigūracija</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Aplinka:</span>
                <button onClick={() => setEnv(env === 'test' ? 'live' : 'test')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition
                    ${env === 'live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {env === 'live' ? '● Live' : '● Test'}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Stripe Secret Key', val: stripeKey, set: setStripeKey, icon: '💳' },
                { label: 'PayPal Client ID',  val: paypalKey, set: setPaypalKey, icon: '🅿️' },
                { label: 'Razorpay Key',      val: razorKey,  set: setRazorKey,  icon: '⚡' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{f.icon} {f.label}</label>
                  <div className="relative">
                    <input type={showKeys ? 'text' : 'password'} value={f.val} onChange={e => f.set(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 font-mono focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  </div>
                </div>
              ))}
              <button onClick={() => setShowKeys(!showKeys)}
                className="flex items-center gap-2 text-xs text-purple-600 hover:text-purple-700 font-medium">
                {showKeys ? <><EyeOff size={13}/> Slėpti raktus</> : <><Eye size={13}/> Rodyti raktus</>}
              </button>
            </div>
          </div>

          {/* Commission */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Komisiniai nustatymai</h3>
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-2">
                Komisinis procentas virš Airalo bazinės kainos
              </label>
              <div className="flex items-center gap-4">
                <input type="range" min="0" max="50" value={commission} onChange={e => setCommission(e.target.value)}
                  className="flex-1 accent-purple-600" />
                <span className="text-2xl font-bold text-purple-600 w-14 text-right">{commission}%</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Bazinė kaina $10.00 → su komisiniais: <span className="font-semibold text-gray-800">${(10 * (1 + commission/100)).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-3">
              {[
                { label: 'Automatiniai grąžinimai (Airalo)', desc: 'Automatiškai grąžinti neaktyvuotus eSIM' },
                { label: 'Email notifikacijos',              desc: 'Siųsti patvirtinimus el. paštu'           },
                { label: 'KYC privalomas',                   desc: 'Reikalauti KYC prieš pirkinį'             },
              ].map(s => {
                const [on, setOn] = useState(true);
                return (
                  <div key={s.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{s.label}</div>
                      <div className="text-xs text-gray-400">{s.desc}</div>
                    </div>
                    <button onClick={() => setOn(!on)}>
                      {on ? <ToggleRight size={28} className="text-purple-600"/> : <ToggleLeft size={28} className="text-gray-300"/>}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Branding */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 col-span-2">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Branding ir logotipas</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Logotipas', hint: 'PNG, SVG · Max 2MB' },
                { label: 'Favicon',   hint: 'ICO, PNG 32×32px'  },
                { label: 'Tamsus logotipas', hint: 'Tamsiam fone' },
              ].map(b => (
                <div key={b.label} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-300 transition cursor-pointer">
                  <div className="text-3xl mb-2">🖼</div>
                  <div className="text-xs font-semibold text-gray-700">{b.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{b.hint}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={save} className="gradient-bg text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition">
            <Save size={15}/> Išsaugoti nustatymus
          </button>
        </div>
      </div>
    </div>
  );
}
