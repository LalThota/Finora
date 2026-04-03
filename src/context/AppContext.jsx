import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_TRANSACTIONS, CATEGORIES } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finora_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('finora_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('finora_budgets');
    return saved ? JSON.parse(saved) : [
      { category: 'Food & Dining', limit: 500 },
      { category: 'Transport', limit: 300 },
      { category: 'Health', limit: 200 },
      { category: 'Entertainment', limit: 400 },
    ];
  });
  
  const [role, setRole] = useState('Admin'); // Viewer or Admin
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // All, Income, Expense
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved === 'true';
  });
  const [activeView, setActiveView] = useState('Overview'); // Overview, Transactions, Analytics, Settings, Help
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@nexuspay.com',
    role: 'Senior Financial Analyst',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReport: false,
    securityLogs: true
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    localStorage.setItem('finora_transactions', JSON.stringify(transactions));
    localStorage.setItem('finora_categories', JSON.stringify(categories));
    localStorage.setItem('finora_budgets', JSON.stringify(budgets));
  }, [transactions, categories, budgets]);

  useEffect(() => {
    localStorage.setItem('dark_mode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    setTransactions(prev => [{ ...transaction, id: Date.now().toString() }, ...prev]);
    showToast('Transaction added', 'success');
  };

  const updateTransaction = (id, updatedData) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
    showToast('Changes saved', 'success');
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(prev => prev.filter(t => t.id !== id));
    showToast('Record deleted', 'info');
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase().trim();
      result = result.filter(t => 
        t.description.toLowerCase().includes(lowerSearch) || 
        t.category.toLowerCase().includes(lowerSearch) ||
        t.amount.toString().includes(lowerSearch)
      );
    }

    // Type filter
    if (typeFilter !== 'All') {
      result = result.filter(t => t.type === typeFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];
      
      if (sortConfig.key === 'amount') {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, sortConfig]);

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const forecast = {
      projectedIncome: totalIncome * 1.05, // 5% growth
      projectedExpense: totalExpenses * 0.98, // 2% efficiency
      predictedBalance: (totalIncome * 1.05) - (totalExpenses * 0.98)
    };
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      forecast
    };
  }, [transactions]);

  const value = {
    transactions,
    categories,
    setCategories,
    budgets,
    setBudgets,
    filteredTransactions,
    activeView,
    setActiveView,
    role,
    setRole,
    darkMode,
    setDarkMode,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    sortConfig,
    setSortConfig,
    userProfile,
    setUserProfile,
    notifications,
    setNotifications,
    showMobileMenu,
    setShowMobileMenu,
    toast,
    showToast,
    stats,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
