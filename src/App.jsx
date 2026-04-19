import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminUsers from './AdminUsers';
import AdminOrders from './AdminOrders';
import AdminSettings from './AdminSettings';
import AdminSupport from './AdminSupport';
import AdminMasterData from './AdminMasterData';
import AdminSubPages, { AdminESIMs, AdminFamily, AdminAnalytics } from './AdminSubPages';
import Store from './Store';
import Success from './Success';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/masterdata" element={<AdminMasterData />} />
          <Route path="/admin/esims" element={<AdminESIMs />} />
          <Route path="/admin/family" element={<AdminFamily />} />
          <Route path="/admin/track" element={<AdminSubPages />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/banners" element={<AdminSubPages />} />
          <Route path="/admin/pages" element={<AdminSubPages />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/success" element={<Success />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;