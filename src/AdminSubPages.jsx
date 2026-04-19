// src/pages/AdminESIMs.jsx
import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import { RefreshCw } from 'lucide-react';

const ESIMS = [
  { id: 1, iccid: '8981100024800123', country: '🇯🇵 Japonija',  plan: 'Tokyo 3GB',  user: 'Alex Li',   status: 'activated',     used: 2.1, total: 3,   purchaseDate: '2026-04-18' },
  { id: 2, iccid: '8949104023120456', country: '🇩🇪 Vokietija',  plan: 'EU 10GB',    user: 'Maria K.',  status: 'activated',     used: 7.4, total: 10,  purchaseDate: '2026-04-17' },
  { id: 3, iccid: '8991101063280789', country: '🇮🇳 Indija',     plan: 'Local 1GB',  user: 'Ravi B.',   status: 'not_activated', used: 0,   total: 1,   purchaseDate: '2026-04-17' },
  { id: 4, iccid: '8901260824119012', country: '🇺🇸 JAV',        plan: 'Data 5GB',   user: 'Sara N.',   status: 'activated',     used: 4.9, total: 5,   purchaseDate: '2026-04-16' },
  { id: 5, iccid: '8912345678901234', country: '🇬🇧 JK',         plan: 'Premium 10GB',user: 'Tom W.',   status: 'installed',     used: 1.2, total: 10,  purchaseDate: '2026-04-15' },
  { id: 6, iccid: '8923456789012345', country: '🇱🇹 Lietuva',    plan: 'Telia 100GB',user: 'Mantas P.',status: 'not_activated', used: 0,   total: 100, purchaseDate: '2026-04-14' },
];

const statusCfg = {
  activated:     { label: 'Aktyvuotas', color: 'bg-green-100 text-green-700' },
  installed:     { label: 'Įdiegtas',   color: 'bg-blue-100 text-blue-700'   },
  not_activated: { label: 'Neaktyvuotas', color: 'bg-gray-100 text-gray-500' },
};

export function AdminESIMs() {
  const [esims, setEsims] = useState(ESIMS);
  const [notif, setNotif] = useState('');

  const refund = (id) => {
    setEsims(esims.map(e => e.id === id ? { ...e, status: 'refunded' } : e));
    setNotif('Grąžinimas inicijuotas sėkmingai!');
    setTimeout(() => setNotif(''), 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="eSIM valdymas" subtitle="Aktyvacijų stebėjimas ir grąžinimai" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {notif && <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">✅ {notif}</div>}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Aktyvuoti', val: esims.filter(e=>e.status==='activated').length,     color: 'text-green-600' },
            { label: 'Įdiegti',   val: esims.filter(e=>e.status==='installed').length,     color: 'text-blue-600'  },
            { label: 'Neaktyvuoti', val: esims.filter(e=>e.status==='not_activated').length, color: 'text-gray-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <span className={`text-2xl font-bold ${s.color}`}>{s.val}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['ICCID','Šalis','Planas','Vartotojas','Naudojimas','Pirkimo data','Statusas','Grąžinti'].map(h =>
                <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
              )}</tr>
            </thead>
            <tbody>
              {esims.map(e => {
                const s = statusCfg[e.status] || { label: e.status, color: 'bg-gray-100 text-gray-500' };
                const pct = Math.round((e.used / e.total) * 100);
                return (
                  <tr key={e.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-[10px] text-sky-600">{e.iccid}</td>
                    <td className="px-4 py-3 text-[12px]">{e.country}</td>
                    <td className="px-4 py-3 text-[12px] font-medium">{e.plan}</td>
                    <td className="px-4 py-3 text-[12px]">{e.user}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden" style={{minWidth:60}}>
                          <div className={`h-full rounded-full ${pct > 80 ? 'bg-red-400' : 'bg-sky-500'}`} style={{width:`${pct}%`}}></div>
                        </div>
                        <span className="text-[10px] text-gray-500 whitespace-nowrap">{e.used}/{e.total}GB</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-[11px]">{e.purchaseDate}</td>
                    <td className="px-4 py-3"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span></td>
                    <td className="px-4 py-3">
                      {e.status === 'not_activated' ? (
                        <button onClick={() => refund(e.id)}
                          className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold hover:bg-amber-100 transition">
                          <RefreshCw size={11}/> Grąžinti
                        </button>
                      ) : <span className="text-[10px] text-gray-300">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// src/pages/AdminFamily.jsx
import { useApp } from './AppContext';
import { TriangleAlert as AlertTriangle, Plus, Trash2 } from 'lucide-react';

export function AdminFamily() {
  const { familyMembers, setFamilyMembers } = useApp();
  const [name, setName] = useState('');
  const [gb, setGb]     = useState('');

  const add = () => {
    if (!name || !gb) return;
    setFamilyMembers([...familyMembers, { id: Date.now(), name, used: 0, total: parseFloat(gb), plan: `Custom ${gb}GB` }]);
    setName(''); setGb('');
  };
  const remove = (id) => setFamilyMembers(familyMembers.filter(m => m.id !== id));

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Šeimos planai" subtitle="Duomenų naudojimas šeimos nariams" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {familyMembers.map(m => {
            const pct = Math.round((m.used / m.total) * 100);
            const over = pct > 80;
            const color = over ? 'bg-red-400' : pct > 60 ? 'bg-amber-400' : 'bg-sky-500';
            return (
              <div key={m.id} className={`bg-white rounded-2xl border p-5 ${over ? 'border-red-200' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">{m.name[0]}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{m.name}</div>
                      <div className="text-xs text-gray-400">{m.plan}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {over && <AlertTriangle size={16} className="text-red-500"/>}
                    <button onClick={() => remove(m.id)} className="text-gray-300 hover:text-red-400 transition"><Trash2 size={14}/></button>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className={`h-full rounded-full ${color} transition-all`} style={{width:`${pct}%`}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{m.used} GB panaudota</span>
                  <span className="font-semibold">{(m.total - m.used).toFixed(1)} GB liko</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Pridėti narį</h3>
          <div className="flex gap-3">
            <input className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Vardas" value={name} onChange={e=>setName(e.target.value)} />
            <input type="number" className="w-28 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="GB planas" value={gb} onChange={e=>setGb(e.target.value)} />
            <button onClick={add} className="gradient-bg text-white px-4 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={15}/> Pridėti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/pages/AdminTracking.jsx
export function AdminTracking() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Live Ryšys" subtitle="Realaus laiko tinklo stebėjimas" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Tinklo statusas</h3>
            {[
              { name: '5G Telia LT',   signal: 90, lat: 12,  color: 'bg-green-500',  status: 'Puikus'    },
              { name: '4G LTE Backup', signal: 65, lat: 38,  color: 'bg-amber-400',  status: 'Vidutinis' },
              { name: '3G Failover',   signal: 30, lat: 95,  color: 'bg-red-400',    status: 'Silpnas'   },
            ].map(n => (
              <div key={n.name} className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-gray-700">{n.name}</span>
                  <span className={`font-medium ${n.signal > 70 ? 'text-green-600' : n.signal > 50 ? 'text-amber-600' : 'text-red-500'}`}>{n.status}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                  <div className={`h-full ${n.color} rounded-full`} style={{width:`${n.signal}%`}}></div>
                </div>
                <div className="text-[10px] text-gray-400">Signalas: {n.signal}% · Latencija: {n.lat}ms</div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
              {[
                { label: 'MB šiandien', val: '247', color: 'text-sky-600' },
                { label: 'Latencija',   val: '12ms', color: 'text-green-600' },
                { label: 'Platuma',     val: '54.69°', color: 'text-blue-600' },
                { label: 'Ilguma',      val: '25.28°', color: 'text-pink-500' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className={`text-lg font-bold font-mono ${s.color}`}>{s.val}</div>
                  <div className="text-[10px] text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden relative" style={{minHeight:400}}>
            <div className="absolute inset-0" style={{background:'#e9ecf3', backgroundImage:'linear-gradient(rgba(14,165,233,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(14,165,233,0.08) 1px,transparent 1px)', backgroundSize:'30px 30px'}}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 bg-sky-500 rounded-full shadow-lg" style={{boxShadow:'0 0 0 0 rgba(14,165,233,0.4)', animation:'ping 1.5s ease-in-out infinite'}}></div>
                <div className="absolute inset-0 -m-8 rounded-full border border-sky-400 opacity-30" style={{animation:'expand 2s ease-out infinite'}}></div>
                <div className="absolute inset-0 -m-16 rounded-full border border-sky-300 opacity-15" style={{animation:'expand 2s ease-out infinite 0.7s'}}></div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
              <div className="text-xs font-bold text-sky-700">Vilnius, Lietuva</div>
              <div className="text-[10px] text-gray-500 mt-0.5">54.6872° N · 25.2797° E</div>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-2.5 py-1.5">
              <div className="text-[10px] font-bold text-green-600">● Live</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/pages/AdminAnalytics.jsx
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AdminAnalytics() {
  const salesData = [
    {month:'Sau',revenue:4200,profit:1200,orders:82},
    {month:'Vas',revenue:5800,profit:1900,orders:94},
    {month:'Kov',revenue:7200,profit:2400,orders:112},
    {month:'Bal',revenue:9100,profit:3100,orders:134},
  ];
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Ataskaitos ir analizė" subtitle="Pardavimai, pelnas ir augimas" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Bendros pajamos',  val: '$26,300', delta: '+28%', color: 'text-sky-600' },
            { label: 'Grynasis pelnas',  val: '$8,600',  delta: '+22%', color: 'text-green-600'  },
            { label: 'Vidutinis užsakymas', val: '$19.2', delta: '+6%', color: 'text-blue-600'   },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs font-semibold text-green-500 mt-1">{s.delta} šį ketvirtį</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Pajamos ir pelnas</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{fontSize:11}}/>
                <YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Bar dataKey="revenue" name="Pajamos" fill="#0ea5e9" radius={[4,4,0,0]}/>
                <Bar dataKey="profit"  name="Pelnas"  fill="#22c55e" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Užsakymų augimas</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{fontSize:11}}/>
                <YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Line type="monotone" dataKey="orders" stroke="#0ea5e9" strokeWidth={2} dot={{r:4,fill:'#0ea5e9'}} name="Užsakymai"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminESIMs;
