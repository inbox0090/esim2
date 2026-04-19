import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './AppContext';
import { Globe, MessageSquare, Send, X, ChevronRight, Shield, Zap, Clock } from 'lucide-react';

export default function Store() {
  const { plans, currency, setCurrency } = useApp();
  const [loading, setLoading]            = useState(null);
  const [chatOpen, setChatOpen]          = useState(false);
  const [chatMsgs, setChatMsgs]          = useState([{ role: 'bot', text: 'Sveiki! Aš esu Travel AI 🤖 Klauskite apie eSIM planus kelionei!' }]);
  const [chatInput, setChatInput]        = useState('');
  const navigate = useNavigate();

  const handlePay = async (plan) => {
    setLoading(plan.id);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: plan.country,
          data: plan.data,
          price: (plan.priceUSD * currency.rate).toFixed(2),
          currency: currency.code.toLowerCase()
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        navigate('/success');
      }
    } catch {
      navigate('/success'); // Demo: go to success when backend not running
    }
    setLoading(null);
  };

  const aiReplies = {
    'jav': 'JAV kelionei rekomenduoju 10–20 GB planą. AT&T tinklas puikus miestuose.',
    'japoni': 'Japonijoje internetas labai greitas. 20 GB pakaks dviem savaitėms.',
    'europ': 'Europai puikiai tinka EU roaming planai. 10 GB = ~1 savaitė.',
    'gb': 'Vidutiniškai reikia 1-2 GB per dieną. Ilgesnei kelionei – daugiau.',
    'kaina': 'Mūsų planai prasideda nuo $9! Telia Lietuva 100GB tik $12 – pats pigiausias!',
  };

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatMsgs(m => [...m, { role: 'user', text: msg }]);
    setChatInput('');
    const lower = msg.toLowerCase();
    const reply = Object.entries(aiReplies).find(([k]) => lower.includes(k))?.[1] || 'Galiu padėti pasirinkti eSIM planą! Pasakykite, į kurią šalį keliaujate? 🗺️';
    setTimeout(() => setChatMsgs(m => [...m, { role: 'bot', text: reply }]), 600);
  };

  const currRates = { USD: { symbol: '$', rate: 1 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 } };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="gradient-bg text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-black mb-3 tracking-tight">eSIM Connect</h1>
        <p className="text-white/80 text-lg mb-6">Keliauk be sienų. Jungtis visame pasaulyje.</p>
        <div className="flex items-center justify-center gap-6 text-sm text-white/70">
          <span className="flex items-center gap-1.5"><Zap size={14}/> Momentinis aktyvavimas</span>
          <span className="flex items-center gap-1.5"><Globe size={14}/> 190+ šalių</span>
          <span className="flex items-center gap-1.5"><Shield size={14}/> Saugus mokėjimas</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Currency + title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">Pasirinkite planą</h2>
          <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            {Object.entries(currRates).map(([c, v]) => (
              <button key={c} onClick={() => setCurrency({ code: c, ...v })}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${currency.code === c ? 'gradient-bg text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {plans.map((p, i) => (
            <div key={p.id} className={`bg-white rounded-2xl border p-6 card-hover cursor-pointer relative overflow-hidden
              ${i === 0 ? 'border-purple-300 shadow-md shadow-purple-100' : 'border-gray-100'}`}>
              {i === 0 && <div className="absolute top-3 right-3 gradient-bg text-white text-[10px] font-bold px-2 py-0.5 rounded-full">⭐ Populiariausias</div>}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{p.flag || '🌍'}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{p.country}</h3>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{p.operator} Network</p>
                </div>
              </div>
              <div className="text-5xl font-black text-gray-900 mb-1">{p.data}<span className="text-xl text-gray-400 font-medium"> GB</span></div>
              <p className="text-xs text-gray-400 mb-5">Duomenų paketas · {p.region || 'Global'}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-black text-gray-900">{currency.symbol}{(p.priceUSD * currency.rate).toFixed(2)}</div>
                  <div className="text-[10px] text-gray-400">vienkartinis mokėjimas</div>
                </div>
                <button onClick={() => handlePay(p)} disabled={loading === p.id}
                  className="gradient-bg text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-1.5 hover:opacity-90 transition disabled:opacity-60">
                  {loading === p.id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <><span>Pirkti</span><ChevronRight size={14}/></>}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: <Zap size={20} className="text-purple-600"/>, title: 'Greitas aktyvavimas', desc: 'eSIM paruoštas per kelias minutes' },
            { icon: <Globe size={20} className="text-blue-600"/>, title: 'Pasaulinis tinklas',   desc: '190+ šalių, vietinės kainos'    },
            { icon: <Clock size={20} className="text-green-600"/>, title: '24/7 Palaikymas',     desc: 'Pagalba bet kuriuo metu'         },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">{f.icon}</div>
              <div className="font-semibold text-gray-900 text-sm">{f.title}</div>
              <div className="text-xs text-gray-400 mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel AI Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 mb-3 overflow-hidden">
            <div className="gradient-bg p-4 flex justify-between items-center">
              <span className="text-white font-semibold text-sm">🤖 Travel AI</span>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white"><X size={16}/></button>
            </div>
            <div className="h-52 overflow-y-auto p-3 space-y-2">
              {chatMsgs.map((m, i) => (
                <div key={i} className={`text-xs px-3 py-2 rounded-xl max-w-[85%] ${m.role === 'bot' ? 'bg-gray-100 text-gray-700' : 'bg-purple-100 text-purple-800 ml-auto'}`}>{m.text}</div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 flex gap-2">
              <input className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Klauskite..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} />
              <button onClick={sendChat} className="gradient-bg text-white p-2 rounded-lg"><Send size={13}/></button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)}
          className="gradient-bg text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:opacity-90 transition">
          {chatOpen ? <X size={20}/> : <MessageSquare size={20}/>}
        </button>
      </div>
    </div>
  );
}
