import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS, CATEGORIES } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      transactions: INITIAL_TRANSACTIONS,
      categories: CATEGORIES,
      budgets: [
        { category: 'Food & Dining', limit: 500 },
        { category: 'Transport', limit: 300 },
        { category: 'Health', limit: 200 },
        { category: 'Entertainment', limit: 400 },
      ],
      role: 'Admin',
      searchTerm: '',
      typeFilter: 'All',
      categoryFilter: 'All',
      dateFilter: { startDate: '', endDate: '' }, // Added date range filter
      sortConfig: { key: 'date', direction: 'desc' },
      darkMode: false,
      activeView: 'Overview',
      userProfile: {
        name: 'John Doe',
        email: 'john@nexuspay.com',
        role: 'Senior Financial Analyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      notifications: {
        emailAlerts: true,
        weeklyReport: false,
        securityLogs: true
      },
      showMobileMenu: false,
      toast: { show: false, message: '', type: 'info' },

      isGlobalLoading: true, // For skeletons

      setGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),

      setCategories: (categories) => set({ categories }),
      setBudgets: (budgets) => set({ budgets }),
      setRole: (role) => set({ role }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setDateFilter: (dateFilter) => set({ dateFilter }),
      setSortConfig: (sortConfig) => set({ sortConfig }),
      setDarkMode: (darkMode) => {
        set({ darkMode });
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      setActiveView: (activeView) => set({ activeView }),
      setUserProfile: (userProfile) => set({ userProfile }),
      setNotifications: (notifications) => set({ notifications }),
      setShowMobileMenu: (showMobileMenu) => set({ showMobileMenu }),
      
      showToast: (message, type = 'info') => {
        set({ toast: { show: true, message, type } });
        setTimeout(() => set((state) => ({ toast: { ...state.toast, show: false } })), 3000);
      },

      addTransaction: (transaction) => {
        const { role } = get();
        if (role !== 'Admin') return;
        set((state) => ({
          transactions: [{ ...transaction, id: Date.now().toString() }, ...state.transactions]
        }));
        get().showToast('Transaction added', 'success');
      },

      updateTransaction: (id, updatedData) => {
        const { role } = get();
        if (role !== 'Admin') return;
        set((state) => ({
          transactions: state.transactions.map(t => t.id === id ? { ...t, ...updatedData } : t)
        }));
        get().showToast('Changes saved', 'success');
      },

      deleteTransaction: (id) => {
        const { role } = get();
        if (role !== 'Admin') return;
        set((state) => ({
          transactions: state.transactions.filter(t => t.id !== id)
        }));
        get().showToast('Record deleted', 'info');
      },

      getFilteredTransactions: () => {
        const { transactions, searchTerm, typeFilter, categoryFilter, dateFilter, sortConfig } = get();
        let result = [...transactions];

        if (searchTerm.trim()) {
          const lowerSearch = searchTerm.toLowerCase().trim();
          result = result.filter(t => 
            t.description.toLowerCase().includes(lowerSearch) || 
            t.category.toLowerCase().includes(lowerSearch) ||
            t.amount.toString().includes(lowerSearch)
          );
        }

        if (typeFilter !== 'All') {
          result = result.filter(t => t.type === typeFilter);
        }

        if (categoryFilter && categoryFilter !== 'All') {
          result = result.filter(t => t.category === categoryFilter);
        }

        if (dateFilter.startDate) {
          result = result.filter(t => new Date(t.date) >= new Date(dateFilter.startDate));
        }

        if (dateFilter.endDate) {
          result = result.filter(t => new Date(t.date) <= new Date(dateFilter.endDate));
        }

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
      },

      getStats: () => {
        const transactions = get().transactions;
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
      }
    }),
    {
      name: 'finora-storage',
      partialize: (state) => ({ 
        transactions: state.transactions,
        categories: state.categories,
        budgets: state.budgets,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useStore;
