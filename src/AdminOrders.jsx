import AdminTopbar from './AdminTopbar';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const ORDERS = [
  { id: '#ESM-00491', customer: 'Alex Li',      email: 'alex@email.com',   country: '🇯🇵 Japonija',  date: '2026-04-18', amount: 24.99, payment: 'Stripe',    status: 'completed' },
  { id: '#ESM-00490', customer: 'Maria K.',     email: 'maria@email.com',  country: '🇩🇪 Vokietija',  date: '2026-04-18', amount: 18.50, payment: 'PayPal',   status: 'completed' },
  { id: '#ESM-00489', customer: 'Ravi B.',      email: 'ravi@email.com',   country: '🇮🇳 Indija',     date: '2026-04-17', amount: 9.99,  payment: 'Razorpay', status: 'pending'   },
  { id: '#ESM-00488', customer: 'Sara N.',      email: 'sara@email.com',   country: '🇺🇸 JAV',        date: '2026-04-17', amount: 34.99, payment: 'Stripe',   status: 'failed'    },
  { id: '#ESM-00487', customer: 'Tom W.',       email: 'tom@email.com',    country: '🇬🇧 JK',         date: '2026-04-16', amount: 14.00, payment: 'Stripe',   status: 'completed' },
  { id: '#ESM-00486', customer: 'Mantas P.',    email: 'mantas@email.com', country: '🇱🇹 Lietuva',    date: '2026-04-16', amount: 12.00, payment: 'Stripe',   status: 'completed' },
  { id: '#ESM-00485', customer: 'Yuki T.',      email: 'yuki@email.com',   country: '🇯🇵 Japonija',   date: '2026-04-15', amount: 30.00, payment: 'PayPal',   status: 'completed' },
  { id: '#ESM-00484', customer: 'Carlos M.',    email: 'carlos@email.com', country: '🇪🇸 Ispanija',   date: '2026-04-15', amount: 18.00, payment: 'Stripe',   status: 'failed'    },
];

const statusConfig = {
  completed: { label: 'Įvykdytas', color: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
  pending:   { label: 'Laukiama',  color: 'bg-amber-100 text-amber-700',  dot: 'bg-amber-500'  },
  failed:    { label: 'Nepavyko', color: 'bg-red-100 text-red-700',      dot: 'bg-red-500'    },
};

export default function AdminOrders() {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('all');

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Užsakymų valdymas" subtitle={`${ORDERS.length} užsakymų iš viso`} />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Visi',       val: ORDERS.length,                      color: 'text-gray-800',   bg: 'bg-gray-100'  },
            { label: 'Įvykdyti',  val: ORDERS.filter(o=>o.status==='completed').length, color: 'text-green-700', bg: 'bg-green-100' },
            { label: 'Laukiama',  val: ORDERS.filter(o=>o.status==='pending').length,   color: 'text-amber-700', bg: 'bg-amber-100' },
            { label: 'Nepavykę', val: ORDERS.filter(o=>o.status==='failed').length,    color: 'text-red-600',   bg: 'bg-red-100'   },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <span className={`text-2xl font-bold ${s.color}`}>{s.val}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-4">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={14} className="text-gray-400"/>
              <input placeholder="Ieškoti pagal ID arba klientą..."
                className="bg-transparent outline-none text-xs text-gray-600 w-48 placeholder-gray-400"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {['all','completed','pending','failed'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                    ${filter === f ? 'gradient-bg text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f === 'all' ? 'Visi' : f === 'completed' ? 'Įvykdyti' : f === 'pending' ? 'Laukiama' : 'Nepavykę'}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Užsakymo ID','Klientas','Šalis','Data','Suma','Mokėjimas','Statusas'].map(h =>
                <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
              )}</tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const s = statusConfig[o.status];
                return (
                  <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3 font-mono text-[11px] text-sky-600 font-semibold">{o.id}</td>
                    <td className="px-5 py-3">
                      <div className="font-semibold text-gray-800 text-[12px]">{o.customer}</div>
                      <div className="text-[10px] text-gray-400">{o.email}</div>
                    </td>
                    <td className="px-5 py-3 text-[12px]">{o.country}</td>
                    <td className="px-5 py-3 text-gray-500 text-[12px]">{o.date}</td>
                    <td className="px-5 py-3 font-mono font-semibold text-[12px]">${o.amount.toFixed(2)}</td>
                    <td className="px-5 py-3 text-gray-600 text-[12px]">{o.payment}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${s.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>{s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="text-center py-10 text-gray-400 text-sm">Užsakymų nerasta</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
