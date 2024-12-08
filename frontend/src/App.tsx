import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './features/dashboard/components/Dashboard';
import { Inventory } from './features/inventory/components/Inventory';
import { Billing } from './features/billing/components/Billing';
import { Customers } from './features/crm/components/Customers';
import { Reports } from './features/reports/components/Reports';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="billing" element={<Billing />} />
              <Route path="customers" element={<Customers />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
