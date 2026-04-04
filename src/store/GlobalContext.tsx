import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { INITIAL_TRANSACTIONS, CATEGORIES } from '../data/mockData';

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finora_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [filters, setFilters] = useState({
    category: 'All',
    type: 'All',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const [categories, setCategories] = useState(CATEGORIES);
  const [budgets, setBudgets] = useState([
    { category: 'Food & Dining', limit: 500 },
    { category: 'Transport', limit: 300 },
    { category: 'Health', limit: 200 },
    { category: 'Entertainment', limit: 400 },
  ]);

  const [role, setRole] = useState('Admin');
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('Overview');
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
  const [isGlobalLoading, setGlobalLoading] = useState(true);

  // Sorting state (requested explicitly)
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  useEffect(() => {
    localStorage.setItem('finora_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const forecast = {
      projectedIncome: totalIncome * 1.05,
      projectedExpense: totalExpenses * 0.98,
      predictedBalance: (totalIncome * 1.05) - (totalExpenses * 0.98)
    };
    
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      forecast
    };
  }, [transactions]);

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filters
    if (filters.searchTerm.trim()) {
      const search = filters.searchTerm.toLowerCase().trim();
      result = result.filter(t => 
        t.description.toLowerCase().includes(search) || 
        t.category.toLowerCase().includes(search) ||
        t.amount.toString().includes(search)
      );
    }

    if (filters.type !== 'All') {
      result = result.filter(t => t.type === filters.type);
    }

    if (filters.category !== 'All') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
    }

    // Sorting
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'date') {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (sortField === 'amount') {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [transactions, filters, sortField, sortOrder]);

  const value = {
    transactions,
    setTransactions,
    filters,
    setFilters,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filteredTransactions: filteredAndSortedTransactions, // Keep backwards compatibility with my other components
    categories,
    setCategories,
    budgets,
    setBudgets,
    role,
    setRole,
    darkMode,
    setDarkMode,
    activeView,
    setActiveView,
    userProfile,
    setUserProfile,
    notifications,
    setNotifications,
    showMobileMenu,
    setShowMobileMenu,
    toast,
    showToast,
    isGlobalLoading,
    setGlobalLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    stats
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error('useGlobalContext must be used within GlobalProvider');
  return context;
};
