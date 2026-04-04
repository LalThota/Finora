import React from 'react';
import { GlobalProvider } from './store/GlobalContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <GlobalProvider>
      <div className="min-h-screen">
        <Dashboard />
      </div>
    </GlobalProvider>
  );
}

export default App;
