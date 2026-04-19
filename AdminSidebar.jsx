import { Link, useLocation } from 'react-router-dom';
import { useApp } from './AppContext';
import {
  LayoutDashboard, Users, Globe, ShoppingBag, Smartphone,
  MessageSquare, BarChart2, Settings, FileText, Image,
  ChevronRight, LogOut, Shield, Map
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',       path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Vartotojai',      path: '/admin/users',     icon: Users            },
  { label: 'Master Data',     path: '/admin/masterdata',icon: Globe,  sub: true },
  { label: 'Užsakymai',       path: '/admin/orders',    icon: ShoppingBag      },
  { label: 'eSIM valdymas',   path: '/admin/esims',     icon: Smartphone       },
  { label: 'Šeimos planai',   path: '/admin/family',    icon: Users            },
  { label: 'Live Ryšys',      path: '/admin/track',     icon: Map              },
  { label: 'Palaikymas',      path: '/admin/support',   icon: MessageSquare, badge: 7 },
  { label: 'Analizė',         path: '/admin/analytics', icon: BarChart2        },
  { label: 'Baneriai',        path: '/admin/banners',   icon: Image            },
  { label: 'Nustatymai',      path: '/admin/settings',  icon: Settings         },
  { label: 'Puslapiai',       path: '/admin/pages',     icon: FileText         },
];

export default function AdminSidebar() {
  const location  = useLocation();
  const { adminUser, setIsLoggedIn } = useApp();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm flex-shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm leading-tight">eSIM Connect</div>
            <div className="text-[10px] text-purple-600 font-medium uppercase tracking-wider">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-2 pb-1.5">Pagrindinė</div>
        {navItems.slice(0,2).map(item => <NavItem key={item.path} item={item} current={location.pathname} />)}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-4 pb-1.5">Valdymas</div>
        {navItems.slice(2,7).map(item => <NavItem key={item.path} item={item} current={location.pathname} />)}
        <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 pt-4 pb-1.5">Kita</div>
        {navItems.slice(7).map(item => <NavItem key={item.path} item={item} current={location.pathname} />)}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm">
            {adminUser.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{adminUser.name}</div>
            <div className="text-[10px] text-gray-400 truncate">{adminUser.email}</div>
          </div>
        </div>
        <button onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 text-xs font-medium transition">
          <LogOut size={14}/> Atsijungti
        </button>
      </div>
    </aside>
  );
}

function NavItem({ item, current }) {
  const active = current === item.path;
  const Icon   = item.icon;
  return (
    <Link to={item.path}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium mb-0.5 transition-all group
        ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      <Icon size={16} className={active ? 'text-purple-600' : 'text-gray-400 group-hover:text-gray-600'} />
      <span className="flex-1">{item.label}</span>
      {item.badge && <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
      {active && <ChevronRight size={12} className="text-purple-400" />}
    </Link>
  );
}
