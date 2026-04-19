import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Smartphone, ArrowLeft } from 'lucide-react';

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={32} className="text-green-600"/>
          </div>
          <h1 className="text-2xl font-black text-gray-900">Pirkimas pavyko!</h1>
          <p className="text-gray-500 text-sm mt-1">Jūsų eSIM paruoštas aktyvacijai</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="text-center text-xs text-gray-400 uppercase tracking-wide mb-4">Nuskaityti QR kodą</div>
          <div className="bg-gray-900 p-5 rounded-xl flex items-center justify-center mb-4">
            <QRCode value="LPA:1$smdp.io$PRO-ESIM-2026" size={150} fgColor="#ffffff" bgColor="transparent"/>
          </div>
          <div className="text-center font-mono text-[10px] text-gray-400 mb-5">LPA:1$smdp.io$PRO-ESIM-2026</div>

          <div className="space-y-2 mb-5 text-sm">
            {[
              { label: 'Statusas',     val: '✅ Paruoštas', color: 'text-green-600' },
              { label: 'Duomenys',     val: '10 GB',        color: 'text-gray-900'  },
              { label: 'Galiojimas',   val: '30 dienų',     color: 'text-gray-900'  },
              { label: 'Operatorius',  val: 'AT&T Network', color: 'text-gray-900'  },
            ].map(r => (
              <div key={r.label} className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">{r.label}</span>
                <span className={`font-semibold ${r.color}`}>{r.val}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => window.print()} className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm transition">
              <Download size={14}/> PDF
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold text-sm transition">
              <Smartphone size={14}/> Wallet
            </button>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-purple-600 text-sm font-medium hover:underline flex items-center gap-1 justify-center">
            <ArrowLeft size={14}/> Grįžti į parduotuvę
          </Link>
        </div>
      </div>
    </div>
  );
}
