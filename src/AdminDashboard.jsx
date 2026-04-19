import AdminTopbar from './AdminTopbar';
import { useApp } from './AppContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Smartphone, ShoppingBag, TrendingUp, CircleCheck as CheckCircle, Circle as XCircle, Clock, ExternalLink } from 'lucide-react';

const ordersData = [
  { month: 'Sau', completed: 820,  failed: 60,  pending: 110 },
  { month: 'Vas', completed: 940,  failed: 45,  pending: 130 },
  { month: 'Kov', completed: 1120, failed: 80,  pending: 90  },
  { month: 'Bal', completed: 1340, failed: 55,  pending: 95  },
];
const usersData = [
  { month: 'Sau', users: 1240 },
  { month: 'Vas', users: 1580 },
  { month: 'Kov', users: 1820 },
  { month: 'Bal', users: 2390 },
];
const recentOrders = [
  { id: '#ESM-00491', customer: 'Alex Li',   country: '🇯🇵 Japonija', date: '2026-04-18', amount: '$24.99', payment: 'Stripe',    status: 'completed' },
  { id: '#ESM-00490', customer: 'Maria K.',  country: '🇩🇪 Vokietija', date: '2026-04-18', amount: '$18.50', payment: 'PayPal',   status: 'completed' },
  { id: '#ESM-00489', customer: 'Ravi B.',   country: '🇮🇳 Indija',    date: '2026-04-17', amount: '$9.99',  payment: 'Razorpay', status: 'pending'   },
  { id: '#ESM-00488', customer: 'Sara N.',   country: '🇺🇸 JAV',       date: '2026-04-17', amount: '$34.99', payment: 'Stripe',   status: 'failed'    },
  { id: '#ESM-00487', customer: 'Tom W.',    country: '🇬🇧 JK',        date: '2026-04-16', amount: '$14.00', payment: 'Stripe',   status: 'completed' },
  { id: '#ESM-00486', customer: 'Mantas P.', country: '🇱🇹 Lietuva',   date: '2026-04-16', amount: '$12.00', payment: 'Stripe',   status: 'completed' },
];

const statusConfig = {
  completed: { label: 'Įvykdytas', color: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  pending:   { label: 'Laukiama',  color: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-500'  },
  failed:    { label: 'Nepavyko', color: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
};

export default function AdminDashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Dashboard" subtitle="Sistemos apžvalga · 2026-04-18" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

        {/* Quick links */}
        <div className="gradient-bg rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-white font-semibold text-sm">Greitos nuorodos</div>
            <div className="text-white/70 text-xs mt-0.5">Tiesioginė prieiga prie portalų</div>
          </div>
          <div className="flex gap-3">
            <a href="https://esimconnect.diploy.in/?client_id=378217172.1776444474&session_id=1776470678"
               target="_blank" rel="noreferrer"
               className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition">
              <ExternalLink size={12}/> Klientų portalas
            </a>
            <a href="https://esimconnect.diploy.in/admin/login?client_id=378217172.1776444474&session_id=1776470678"
               target="_blank" rel="noreferrer"
               className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-2 rounded-lg transition">
              <ExternalLink size={12}/> Admin prisijungimas
            </a>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Registruoti vartotojai', value: '14,892', delta: '+12.4%', up: true,  icon: Users,        color: 'text-blue-600',   bg: 'bg-blue-50'   },
            { label: 'Aktyvūs eSIM',           value: '8,341',  delta: '+8.1%',  up: true,  icon: Smartphone,   color: 'text-green-600',  bg: 'bg-green-50'  },
            { label: 'Visi pirkimai',          value: '31,204', delta: '+19.7%', up: true,  icon: ShoppingBag,  color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Mėnesio pajamos',        value: '$48.2k', delta: '+14.3%', up: true,  icon: TrendingUp,   color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                    <Icon size={18} className={s.color} />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                    {s.delta}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Order status */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Įvykdyti užsakymai', value: '9,812', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', sub: '86% sėkmės' },
            { label: 'Nepavykę užsakymai', value: '643',   icon: XCircle,    color: 'text-red-500',   bg: 'bg-red-50',   sub: '5.6% klaidos' },
            { label: 'Laukiama',           value: '956',   icon: Clock,      color: 'text-amber-600', bg: 'bg-amber-50', sub: '8.4% eilė' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                    <Icon size={18} className={s.color} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                </div>
                <div className={`text-xs font-medium mt-3 ${s.color}`}>{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* KYC */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">KYC Statusas</h3>
            <button className="text-xs text-sky-600 font-medium hover:underline">Peržiūrėti visus →</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Laukiama peržiūros', value: '342',    color: 'text-amber-600', bg: 'bg-amber-50',  border: 'border-amber-200', emoji: '⏳' },
              { label: 'Patvirtinta',        value: '11,247', color: 'text-green-600', bg: 'bg-green-50',  border: 'border-green-200', emoji: '✅' },
              { label: 'Atmesta',            value: '891',    color: 'text-red-500',   bg: 'bg-red-50',    border: 'border-red-200',   emoji: '❌' },
            ].map(k => (
              <div key={k.label} className={`${k.bg} border ${k.border} rounded-xl p-4 flex items-center gap-3`}>
                <span className="text-2xl">{k.emoji}</span>
                <div>
                  <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
                  <div className="text-xs text-gray-600">{k.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Užsakymų apžvalga</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="completed" name="Įvykdyti" fill="#22c55e" radius={[4,4,0,0]} />
                <Bar dataKey="failed"    name="Nepavykę" fill="#ef4444" radius={[4,4,0,0]} />
                <Bar dataKey="pending"   name="Laukiama" fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Naujų vartotojų registracijos</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4, fill: '#0ea5e9' }} name="Vartotojai" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Naujausi užsakymai</h3>
            <button className="text-xs text-sky-600 font-medium hover:underline">Visi užsakymai →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{['ID','Klientas','Šalis','Data','Suma','Mokėjimas','Statusas'].map(h =>
                  <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                )}</tr>
              </thead>
              <tbody>
                {recentOrders.map((o, i) => {
                  const s = statusConfig[o.status];
                  return (
                    <tr key={o.id} className={`border-t border-gray-50 hover:bg-gray-50 transition ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                      <td className="px-5 py-3 font-mono text-[11px] text-sky-600">{o.id}</td>
                      <td className="px-5 py-3 font-medium text-gray-800 text-[12px]">{o.customer}</td>
                      <td className="px-5 py-3 text-[12px]">{o.country}</td>
                      <td className="px-5 py-3 text-gray-500 text-[12px]">{o.date}</td>
                      <td className="px-5 py-3 font-mono font-semibold text-[12px]">{o.amount}</td>
                      <td className="px-5 py-3 text-gray-600 text-[12px]">{o.payment}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>{s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
