import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './AppContext';
import { Globe, MessageSquare, Send, X, ChevronRight, Shield, Zap, Clock, Wifi, Check, Star, ArrowRight, Phone } from 'lucide-react';

export default function Store() {
  const { plans, currency, setCurrency } = useApp();
  const [loading, setLoading]            = useState(null);
  const [chatOpen, setChatOpen]          = useState(false);
  const [chatMsgs, setChatMsgs]          = useState([{ role: 'bot', text: 'Sveiki! Aš esu Travel AI. Klauskite apie eSIM planus kelionei!' }]);
  const [chatInput, setChatInput]        = useState('');
  const [activeRegion, setActiveRegion]  = useState('Visi');
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
      if (data.url) window.location.href = data.url;
      else navigate('/success');
    } catch {
      navigate('/success');
    }
    setLoading(null);
  };

  const aiReplies = {
    'jav': 'JAV kelionei rekomenduoju 10-20 GB planą. AT&T tinklas puikus miestuose.',
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
    const reply = Object.entries(aiReplies).find(([k]) => lower.includes(k))?.[1] || 'Galiu padėti pasirinkti eSIM planą! Pasakykite, į kurią šalį keliaujate?';
    setTimeout(() => setChatMsgs(m => [...m, { role: 'bot', text: reply }]), 600);
  };

  const currRates = { USD: { symbol: '$', rate: 1 }, EUR: { symbol: '€', rate: 0.92 }, GBP: { symbol: '£', rate: 0.79 } };
  const regions   = ['Visi', 'Europe', 'Americas', 'Asia'];
  const filtered  = activeRegion === 'Visi' ? plans : plans.filter(p => p.region === activeRegion);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
              <Wifi size={18} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-tight">eSIM Connect</div>
              <div className="text-[10px] text-sky-500 font-semibold uppercase tracking-wide">Global Network</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
            <a href="#plans" className="hover:text-slate-800 transition font-medium">Planai</a>
            <a href="#features" className="hover:text-slate-800 transition font-medium">Privalumai</a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 rounded-xl p-1">
              {Object.entries(currRates).map(([c, v]) => (
                <button key={c} onClick={() => setCurrency({ code: c, ...v })}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${currency.code === c ? 'gradient-bg text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  {c}
                </button>
              ))}
            </div>
            <a href="/admin/login" className="text-xs text-slate-400 hover:text-slate-600 transition font-medium">Admin</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 w-72 h-72 bg-sky-400 rounded-full blur-3xl opacity-5" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-5" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse"></span>
              190+ šalių tinklas
            </div>
            <h1 className="text-5xl font-black leading-tight mb-4 tracking-tight">
              Keliauk be sienų<br/>
              <span className="text-sky-400">eSIM technologija</span>
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Momentinė prisijungimo galimybė visame pasaulyje. Jokių fizinių SIM kortelių — tik greitas, saugus ir pigus ryšys.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#plans" className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition">
                Peržiūrėti planus <ArrowRight size={16}/>
              </a>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Check size={16} className="text-sky-400"/> Momentinis aktyvavimas
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Zap,    label: 'Aktyvavimas', val: '< 2 min'   },
              { icon: Globe,  label: 'Šalių tinklas', val: '190+'    },
              { icon: Shield, label: 'Saugumas',    val: 'SSL 256'   },
              { icon: Clock,  label: 'Palaikymas',  val: '24/7'      },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-sky-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{s.val}</div>
                    <div className="text-slate-400 text-xs">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PLANS */}
      <div id="plans" className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Pasirinkite planą</h2>
            <p className="text-slate-400 text-sm mt-1">Greita prisijungimo galimybė kelionei</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {regions.map(r => (
              <button key={r} onClick={() => setActiveRegion(r)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${activeRegion === r ? 'gradient-bg text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-sky-300 hover:text-sky-600'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => {
            const isFeatured = i === 0 && activeRegion === 'Visi';
            return (
              <div key={p.id} className={`bg-white rounded-2xl p-6 relative overflow-hidden plan-card ${isFeatured ? 'featured' : ''}`}>
                {isFeatured && (
                  <div className="absolute top-0 right-0">
                    <div className="gradient-bg text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <Star size={9} fill="white"/> Populiariausias
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl border border-slate-100">
                    {p.flag || '🌍'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{p.country}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{p.operator} · {p.region}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black text-slate-900">{p.data}</span>
                    <span className="text-lg font-bold text-slate-400 mb-1">GB</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Wifi size={11}/> LTE/5G</span>
                    <span className="flex items-center gap-1"><Clock size={11}/> 30 dienų</span>
                  </div>
                </div>
                <div className="space-y-1.5 mb-5">
                  {['Momentinis aktyvavimas', 'Jokio perjungimo', 'Atsarginė SIM'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                      <Check size={12} className="text-sky-500 flex-shrink-0"/> {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {currency.symbol}{(p.priceUSD * currency.rate).toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">vienkartinis mokėjimas</div>
                  </div>
                  <button onClick={() => handlePay(p)} disabled={loading === p.id}
                    className={`flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-xl transition disabled:opacity-60
                      ${isFeatured ? 'gradient-bg text-white hover:opacity-90' : 'bg-slate-900 text-white hover:bg-slate-700'}`}>
                    {loading === p.id
                      ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                      : <><span>Pirkti</span><ChevronRight size={14}/></>
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Globe size={40} className="mx-auto mb-3 opacity-30"/>
            <p>Planų nerasta šiam regionui</p>
          </div>
        )}
      </div>

      {/* FEATURES */}
      <div id="features" className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Kodėl eSIM Connect?</h2>
            <p className="text-slate-400 text-sm">Paprasta, greita ir patikima kelionių komunikacija</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap,    title: 'Momentinis aktyvavimas', desc: 'Nuskenuo QR kodą ir prisijunk per kelias minutes. Jokio laukimo, jokių fizinių kortelių.', iconClass: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
              { icon: Globe,  title: 'Pasaulinis tinklas',     desc: '190+ šalių aprėptis. Visada turėsi vietinį ryšį už geriausią kainą.',                      iconClass: 'bg-sky-50 text-sky-600',    border: 'border-sky-100'    },
              { icon: Shield, title: 'Saugus mokėjimas',       desc: 'SSL šifravimas ir patikimi mokėjimo partneriai. Tavo duomenys visada saugūs.',               iconClass: 'bg-green-50 text-green-600', border: 'border-green-100' },
              { icon: Phone,  title: 'Suderinami įrenginiai',  desc: 'iPhone, Samsung, Google Pixel ir daugelis kitų.',                                           iconClass: 'bg-slate-50 text-slate-600', border: 'border-slate-100' },
              { icon: Clock,  title: '24/7 Palaikymas',        desc: 'Mūsų komanda visada pasiruošusi padėti, nesvarbu kur ir kada keliaujate.',                  iconClass: 'bg-teal-50 text-teal-600',  border: 'border-teal-100'   },
              { icon: Check,  title: 'Lankstūs planai',        desc: 'Nuo 1 GB iki 100 GB planų. Mokėk tik už tai, ko reikia kelionei.',                          iconClass: 'bg-blue-50 text-blue-600',  border: 'border-blue-100'   },
            ].map(f => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`rounded-2xl border ${f.border} p-5 card-hover bg-white`}>
                  <div className={`w-11 h-11 ${f.iconClass} rounded-xl flex items-center justify-center mb-4 border ${f.border}`}>
                    <Icon size={20}/>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 gradient-bg rounded-lg flex items-center justify-center">
              <Wifi size={13} className="text-white"/>
            </div>
            <span className="text-white font-semibold text-sm">eSIM Connect</span>
          </div>
          <span>2026 eSIM Connect. Visos teisės saugomos.</span>
        </div>
      </footer>

      {/* AI CHAT */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 mb-3 overflow-hidden">
            <div className="gradient-bg p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                  <MessageSquare size={13} className="text-white"/>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Travel AI</div>
                  <div className="text-white/70 text-[10px]">Visada online</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white transition">
                <X size={16}/>
              </button>
            </div>
            <div className="h-56 overflow-y-auto p-4 space-y-2 bg-slate-50">
              {chatMsgs.map((m, idx) => (
                <div key={idx} className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed
                  ${m.role === 'bot' ? 'bg-white text-slate-600 border border-slate-100 shadow-sm' : 'bg-sky-500 text-white ml-auto'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
              <input
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
                placeholder="Klauskite apie planus..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
              />
              <button onClick={sendChat} className="gradient-bg text-white p-2 rounded-lg hover:opacity-90 transition">
                <Send size={13}/>
              </button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)}
          className="gradient-bg text-white w-[52px] h-[52px] rounded-full shadow-xl flex items-center justify-center hover:opacity-90 transition">
          {chatOpen ? <X size={20}/> : <MessageSquare size={20}/>}
        </button>
      </div>
    </div>
  );
}
