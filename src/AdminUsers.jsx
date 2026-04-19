import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import { Search, CircleCheck as CheckCircle, Circle as XCircle, Eye, User } from 'lucide-react';

const USERS = [
  { id: 1, name: 'Alex Li',      email: 'alex@email.com',   joined: '2026-01-12', country: '🇯🇵', orders: 4, kyc: 'approved',  spent: '$89.97'  },
  { id: 2, name: 'Maria K.',     email: 'maria@email.com',  joined: '2026-02-03', country: '🇩🇪', orders: 2, kyc: 'approved',  spent: '$37.00'  },
  { id: 3, name: 'Ravi B.',      email: 'ravi@email.com',   joined: '2026-03-18', country: '🇮🇳', orders: 1, kyc: 'pending',   spent: '$9.99'   },
  { id: 4, name: 'Sara N.',      email: 'sara@email.com',   joined: '2026-02-27', country: '🇺🇸', orders: 3, kyc: 'rejected',  spent: '$34.99'  },
  { id: 5, name: 'Tom W.',       email: 'tom@email.com',    joined: '2026-01-05', country: '🇬🇧', orders: 6, kyc: 'approved',  spent: '$112.00' },
  { id: 6, name: 'Mantas P.',    email: 'mantas@email.com', joined: '2026-03-01', country: '🇱🇹', orders: 5, kyc: 'approved',  spent: '$60.00'  },
  { id: 7, name: 'Yuki T.',      email: 'yuki@email.com',   joined: '2026-04-01', country: '🇯🇵', orders: 1, kyc: 'pending',   spent: '$30.00'  },
  { id: 8, name: 'Carlos M.',    email: 'carlos@email.com', joined: '2026-04-10', country: '🇪🇸', orders: 2, kyc: 'pending',   spent: '$36.00'  },
];

const kycConfig = {
  approved: { label: 'Patvirtinta', color: 'bg-green-100 text-green-700' },
  pending:  { label: 'Laukiama',    color: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Atmesta',     color: 'bg-red-100 text-red-600'     },
};

export default function AdminUsers() {
  const [users, setUsers]     = useState(USERS);
  const [search, setSearch]   = useState('');
  const [tab, setTab]         = useState('all');

  const updateKyc = (id, status) => {
    setUsers(users.map(u => u.id === id ? { ...u, kyc: status } : u));
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search);
    const matchTab = tab === 'all' || u.kyc === tab;
    return matchSearch && matchTab;
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Vartotojų valdymas" subtitle="KYC dokumentai ir paskyros" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Visi vartotojai',   val: users.length,                            color: 'text-gray-800'   },
            { label: 'KYC Patvirtinta',  val: users.filter(u=>u.kyc==='approved').length, color: 'text-green-700' },
            { label: 'KYC Laukiama',     val: users.filter(u=>u.kyc==='pending').length,  color: 'text-amber-700' },
            { label: 'KYC Atmesta',      val: users.filter(u=>u.kyc==='rejected').length, color: 'text-red-600'   },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
              <span className={`text-2xl font-bold ${s.color}`}>{s.val}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <Search size={14} className="text-gray-400"/>
              <input placeholder="Ieškoti vartotojo..."
                className="bg-transparent outline-none text-xs text-gray-600 w-40 placeholder-gray-400"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {['all','pending','approved','rejected'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                    ${tab === t ? 'gradient-bg text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t === 'all' ? 'Visi' : t === 'pending' ? 'Laukiama' : t === 'approved' ? 'Patvirtinti' : 'Atmesti'}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Vartotojas','El. paštas','Registracija','Šalis','Užsakymai','Išleista','KYC statusas','Veiksmai'].map(h =>
                <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
              )}</tr>
            </thead>
            <tbody>
              {filtered.map(u => {
                const kyc = kycConfig[u.kyc];
                return (
                  <tr key={u.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div>
                        <span className="font-semibold text-gray-800 text-[12px]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-[12px]">{u.email}</td>
                    <td className="px-5 py-3 text-gray-500 text-[12px]">{u.joined}</td>
                    <td className="px-5 py-3 text-xl">{u.country}</td>
                    <td className="px-5 py-3 text-center font-semibold text-gray-700">{u.orders}</td>
                    <td className="px-5 py-3 font-mono font-semibold text-green-600 text-[12px]">{u.spent}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${kyc.color}`}>{kyc.label}</span>
                    </td>
                    <td className="px-5 py-3">
                      {u.kyc === 'pending' ? (
                        <div className="flex gap-2">
                          <button onClick={() => updateKyc(u.id, 'approved')}
                            className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold hover:bg-green-100 transition flex items-center gap-1">
                            <CheckCircle size={12}/> Patvirtinti
                          </button>
                          <button onClick={() => updateKyc(u.id, 'rejected')}
                            className="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-lg text-[11px] font-semibold hover:bg-red-100 transition flex items-center gap-1">
                            <XCircle size={12}/> Atmesti
                          </button>
                        </div>
                      ) : (
                        <button className="bg-gray-50 text-gray-500 border border-gray-200 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:bg-gray-100 transition flex items-center gap-1">
                          <Eye size={12}/> Peržiūrėti
                        </button>
                      )}
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
