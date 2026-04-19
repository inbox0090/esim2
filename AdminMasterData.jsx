import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import { useApp } from './AppContext';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

export default function AdminMasterData() {
  const { plans, setPlans } = useApp();
  const [form, setForm]     = useState({ country: '', priceUSD: '', data: '', operator: '', flag: '🌍', region: 'Europe' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [notif, setNotif]   = useState(null);

  const showNotif = (msg, ok = true) => {
    setNotif({ msg, ok });
    setTimeout(() => setNotif(null), 3000);
  };

  const addPlan = () => {
    if (!form.country || !form.priceUSD || !form.data) return showNotif('Prašome užpildyti visus privalomus laukus!', false);
    setPlans([...plans, { id: Date.now(), ...form, priceUSD: parseFloat(form.priceUSD), data: parseInt(form.data) }]);
    setForm({ country: '', priceUSD: '', data: '', operator: '', flag: '🌍', region: 'Europe' });
    showNotif(`Planas "${form.country}" sėkmingai pridėtas!`);
  };

  const deletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id));
    showNotif('Planas ištrintas.');
  };

  const startEdit = (p) => { setEditId(p.id); setEditForm({ ...p }); };
  const saveEdit  = () => {
    setPlans(plans.map(p => p.id === editId ? { ...editForm, priceUSD: parseFloat(editForm.priceUSD), data: parseInt(editForm.data) } : p));
    setEditId(null);
    showNotif('Planas atnaujintas!');
  };

  const regions  = ['Europe', 'Americas', 'Asia', 'Africa', 'Middle East', 'Oceania'];
  const flags    = ['🌍','🇺🇸','🇬🇧','🇩🇪','🇫🇷','🇯🇵','🇰🇷','🇮🇳','🇧🇷','🇦🇺','🇨🇦','🇱🇹','🇵🇱','🇪🇸','🇮🇹'];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Master Data" subtitle="Regionai, šalys ir paketai" />
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">

        {notif && (
          <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border
            ${notif.ok ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
            {notif.ok ? <Check size={16}/> : <X size={16}/>} {notif.msg}
          </div>
        )}

        {/* Add form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Pridėti naują planą</h3>
          <div className="grid grid-cols-6 gap-3 items-end">
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Vėliavėlė</label>
              <select className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={form.flag} onChange={e => setForm({...form, flag: e.target.value})}>
                {flags.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="col-span-1">
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Šalis *</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="pvz. France" value={form.country} onChange={e => setForm({...form, country: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Kaina ($) *</label>
              <input type="number" step="0.01" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="19.99" value={form.priceUSD} onChange={e => setForm({...form, priceUSD: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">GB *</label>
              <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="10" value={form.data} onChange={e => setForm({...form, data: e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Operatorius</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="AT&T" value={form.operator} onChange={e => setForm({...form, operator: e.target.value})} />
            </div>
            <button onClick={addPlan} className="gradient-bg text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition">
              <Plus size={16}/> Pridėti
            </button>
          </div>
        </div>

        {/* Plans table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Visi planai ({plans.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{['','Šalis','Operatorius','Regionas','Duomenys','Kaina (USD)','Veiksmai'].map(h =>
                  <th key={h} className="text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                )}</tr>
              </thead>
              <tbody>
                {plans.map(p => (
                  <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    {editId === p.id ? (
                      <>
                        <td className="px-5 py-3">{p.flag || '🌍'}</td>
                        <td className="px-5 py-3"><input className="border rounded px-2 py-1 text-xs w-24" value={editForm.country} onChange={e=>setEditForm({...editForm, country: e.target.value})} /></td>
                        <td className="px-5 py-3"><input className="border rounded px-2 py-1 text-xs w-24" value={editForm.operator} onChange={e=>setEditForm({...editForm, operator: e.target.value})} /></td>
                        <td className="px-5 py-3">{editForm.region || '—'}</td>
                        <td className="px-5 py-3"><input type="number" className="border rounded px-2 py-1 text-xs w-16" value={editForm.data} onChange={e=>setEditForm({...editForm, data: e.target.value})} /></td>
                        <td className="px-5 py-3"><input type="number" step="0.01" className="border rounded px-2 py-1 text-xs w-20" value={editForm.priceUSD} onChange={e=>setEditForm({...editForm, priceUSD: e.target.value})} /></td>
                        <td className="px-5 py-3 flex gap-2">
                          <button onClick={saveEdit} className="bg-green-100 text-green-700 p-1.5 rounded-lg hover:bg-green-200 transition"><Check size={14}/></button>
                          <button onClick={()=>setEditId(null)} className="bg-gray-100 text-gray-500 p-1.5 rounded-lg hover:bg-gray-200 transition"><X size={14}/></button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-3 text-xl">{p.flag || '🌍'}</td>
                        <td className="px-5 py-3 font-semibold text-gray-800">{p.country}</td>
                        <td className="px-5 py-3 text-gray-600">{p.operator}</td>
                        <td className="px-5 py-3"><span className="bg-purple-50 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">{p.region || 'Europe'}</span></td>
                        <td className="px-5 py-3 font-mono font-bold text-purple-600">{p.data} GB</td>
                        <td className="px-5 py-3 font-mono font-semibold text-green-600">${p.priceUSD}</td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={()=>startEdit(p)} className="bg-blue-50 text-blue-600 p-1.5 rounded-lg hover:bg-blue-100 transition"><Edit2 size={14}/></button>
                            <button onClick={()=>deletePlan(p.id)} className="bg-red-50 text-red-500 p-1.5 rounded-lg hover:bg-red-100 transition"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
