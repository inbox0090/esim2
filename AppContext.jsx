import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState({ code: 'USD', symbol: '$', rate: 1 });
  const [plans, setPlans] = useState([
    { id: 1, country: 'USA',       data: 10,  priceUSD: 15, operator: 'AT&T',     flag: '🇺🇸', region: 'Americas' },
    { id: 2, country: 'Lithuania', data: 100, priceUSD: 12, operator: 'Telia',    flag: '🇱🇹', region: 'Europe'   },
    { id: 3, country: 'Japan',     data: 20,  priceUSD: 30, operator: 'Softbank', flag: '🇯🇵', region: 'Asia'     },
    { id: 4, country: 'Germany',   data: 15,  priceUSD: 18, operator: 'Deutsche', flag: '🇩🇪', region: 'Europe'   },
    { id: 5, country: 'India',     data: 5,   priceUSD: 9,  operator: 'Airtel',   flag: '🇮🇳', region: 'Asia'     },
    { id: 6, country: 'UK',        data: 10,  priceUSD: 16, operator: 'EE',       flag: '🇬🇧', region: 'Europe'   },
  ]);
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: 'Mantas', used: 8.5, total: 10, plan: 'Lithuania 100GB' },
    { id: 2, name: 'Eglė',   used: 2.1, total: 20, plan: 'Germany 15GB'   },
    { id: 3, name: 'Tomas',  used: 4.8, total: 5,  plan: 'USA 10GB'       },
  ]);
  const [adminUser] = useState({ name: 'Super Admin', email: 'admin@esimconnect.com', role: 'Administrator' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={{
      currency, setCurrency,
      plans, setPlans,
      familyMembers, setFamilyMembers,
      adminUser, isLoggedIn, setIsLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
