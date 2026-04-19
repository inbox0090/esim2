import { useState } from 'react';
import AdminTopbar from './AdminTopbar';
import { Send, CheckCircle } from 'lucide-react';

const INIT_TICKETS = [
  { id: 1, user: 'Amara J.',  email: 'amara@email.com',  subject: 'eSIM neaktyvuojasi po įdiegimo',           msg: 'eSIM neaktyvuojasi po įdiegimo iPhone 15 telefone. QR kodas nuskenuotas, bet planas nerodomas nustatymuose.', priority: 'high',   time: '2 val. prieš', status: 'open',   replies: [] },
  { id: 2, user: 'Kai P.',    email: 'kai@email.com',    subject: 'Grąžinimas negautas per 5 dienas',         msg: 'Grąžinimas nebuvo gautas per 5 dienas. Užsakymo numeris: #ESM-00456.',                                        priority: 'high',   time: '4 val. prieš', status: 'open',   replies: [] },
  { id: 3, user: 'Lina M.',   email: 'lina@email.com',   subject: 'Ar galima perkelti eSIM į kitą prietaisą?', msg: 'Pirkau naują telefoną. Ar galima perkelti eSIM planui?',                                                      priority: 'medium', time: '6 val. prieš', status: 'open',   replies: [] },
  { id: 4, user: 'Ben N.',    email: 'ben@email.com',    subject: 'Mokėjimas nuskaičiuotas, bet užsakymas ne', msg: 'Pinigai buvo nurašyti iš kortelės, bet užsakymas nepatvirtintas.',                                           priority: 'medium', time: '8 val. prieš', status: 'open',   replies: [] },
  { id: 5, user: 'Eglė K.',   email: 'egle@email.com',   subject: 'Lėtas internetas aktyvuoto eSIM',          msg: 'Internetas labai lėtas nors nurodytas 5G. Greitis ne daugiau 2 Mbps.',                                        priority: 'low',    time: '1 d. prieš',   status: 'closed', replies: ['Problema išspręsta — APN nustatymai atnaujinti.'] },
];

const priorityConfig = {
  high:   { label: 'Aukštas', color: 'bg-red-100 text-red-600'    },
  medium: { label: 'Vidutinis',color: 'bg-amber-100 text-amber-600' },
  low:    { label: 'Žemas',   color: 'bg-green-100 text-green-700' },
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState(INIT_TICKETS);
  const [selected, setSelected] = useState(null);
  const [reply, setReply]       = useState('');
  const [filter, setFilter]     = useState('open');

  const selectedTicket = tickets.find(t => t.id === selected);

  const sendReply = () => {
    if (!reply.trim()) return;
    setTickets(tickets.map(t => t.id === selected
      ? { ...t, replies: [...t.replies, reply], status: 'closed' }
      : t
    ));
    setReply('');
  };

  const filtered = tickets.filter(t => filter === 'all' || t.status === filter);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AdminTopbar title="Palaikymo centras" subtitle={`${tickets.filter(t=>t.status==='open').length} atvirų bilietų`} />
      <div className="flex-1 overflow-hidden flex">

        {/* Ticket list */}
        <div className="w-80 border-r border-gray-100 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="flex gap-2">
              {['open','closed','all'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition
                    ${filter === f ? 'gradient-bg text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {f === 'open' ? 'Atviri' : f === 'closed' ? 'Uždaryti' : 'Visi'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(t => (
              <div key={t.id} onClick={() => setSelected(t.id)}
                className={`p-4 border-b border-gray-50 cursor-pointer transition
                  ${selected === t.id ? 'bg-purple-50 border-l-2 border-l-purple-500' : 'hover:bg-gray-50'}`}>
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-gray-800 text-[13px]">{t.user}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${priorityConfig[t.priority].color}`}>
                    {priorityConfig[t.priority].label}
                  </span>
                </div>
                <div className="text-[11px] text-gray-600 truncate mb-1">{t.subject}</div>
                <div className="text-[10px] text-gray-400">{t.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket detail */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedTicket ? (
            <>
              <div className="bg-white border-b border-gray-100 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{selectedTicket.subject}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{selectedTicket.user} · {selectedTicket.email}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityConfig[selectedTicket.priority].color}`}>
                        {priorityConfig[selectedTicket.priority].label}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedTicket.status === 'open' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {selectedTicket.status === 'open' ? '● Atviras' : '✓ Uždarytas'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold">{selectedTicket.user[0]}</div>
                    <span className="text-xs font-semibold text-gray-700">{selectedTicket.user}</span>
                    <span className="text-xs text-gray-400">· {selectedTicket.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedTicket.msg}</p>
                </div>
                {selectedTicket.replies.map((r, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl border border-purple-100 p-4 ml-8">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
                      <span className="text-xs font-semibold text-purple-700">Admin</span>
                      <span className="text-xs text-gray-400">· ką tik</span>
                    </div>
                    <p className="text-sm text-gray-700">{r}</p>
                  </div>
                ))}
              </div>
              {selectedTicket.status === 'open' && (
                <div className="bg-white border-t border-gray-100 p-4">
                  <div className="flex gap-3">
                    <textarea className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
                      rows={3} placeholder="Rašykite atsakymą..." value={reply} onChange={e => setReply(e.target.value)} />
                    <button onClick={sendReply} className="gradient-bg text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition self-end">
                      <Send size={14}/> Siųsti
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-3">💬</div>
                <div className="text-sm">Pasirinkite bilietą iš sąrašo</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
