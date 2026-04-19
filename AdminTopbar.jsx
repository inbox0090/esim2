import { Bell, Search, Globe } from 'lucide-react';
import { useApp } from './AppContext';

export default function AdminTopbar({ title, subtitle }) {
  const { adminUser } = useApp();
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-base font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-[11px] text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm">
          <Search size={13} className="text-gray-400" />
          <input placeholder="Ieškoti..." className="bg-transparent outline-none text-[12px] text-gray-600 w-36 placeholder-gray-400" />
        </div>
        <a href="https://esimconnect.diploy.in/?client_id=378217172.1776444474&session_id=1776470678"
          target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium text-purple-600 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition">
          <Globe size={12}/> Klientų portalas
        </a>
        <div className="relative">
          <button className="w-8 h-8 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
            <Bell size={15}/>
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">7</span>
        </div>
        <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-bold">
          {adminUser.name[0]}
        </div>
      </div>
    </header>
  );
}
