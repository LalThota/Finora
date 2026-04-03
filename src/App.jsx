import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </AppProvider>
  );
}

export default App;
