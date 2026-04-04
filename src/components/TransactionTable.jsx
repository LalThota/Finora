import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ArrowUp, ArrowDown, MoreVertical, 
  Trash2, Edit3, Plus, X, Download, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useGlobalContext } from '../store/GlobalContext';
import { CATEGORIES } from '../data/mockData';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const TransactionTable = () => {
  const { 
    filteredTransactions, role, 
    filters, setFilters,
    sortField, setSortField,
    sortOrder, setSortOrder,
    deleteTransaction, addTransaction, updateTransaction,
    categories
  } = useGlobalContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    amount: '',
    category: 'Food & Dining',
    type: 'Expense',
    description: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenModal = (t = null) => {
    if (role !== 'Admin') return;
    if (t) {
      setEditingId(t.id);
      setFormData({
        date: t.date,
        amount: t.amount,
        category: t.category,
        type: t.type,
        description: t.description
      });
    } else {
      setEditingId(null);
      setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: '',
        category: 'Food & Dining',
        type: 'Expense',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role !== 'Admin') return;
    
    const data = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingId) {
      updateTransaction(editingId, data);
    } else {
      addTransaction(data);
    }
    setIsModalOpen(false);
  };

  const handleSort = (key) => {
    if (sortField === key) {
      setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(key);
      setSortOrder('desc'); // First click -> newest to oldest (descending)
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SortIcon = ({ column }) => {
    if (sortField !== column) return null;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800/50 overflow-hidden">
      {/* Table Header / Controls */}
      <div className="p-4 md:p-8 border-b border-slate-200 dark:border-slate-800/60 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            Transactions
          </h4>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage your incoming and outgoing capital</p>
        </div>
        
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search data..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-primary-500/30 focus:ring-4 focus:ring-primary-500/5 text-sm text-slate-700 dark:text-slate-200 transition-all outline-none"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>

          <div className="flex items-center gap-2">
            <select 
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-primary-500/30 text-sm text-slate-700 dark:text-slate-200 transition-all outline-none cursor-pointer"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="All">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select 
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-primary-500/30 text-sm text-slate-700 dark:text-slate-200 transition-all outline-none cursor-pointer"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-2">
              <input 
                type="date"
                className="px-2 py-3 bg-transparent border-none text-sm text-slate-700 dark:text-slate-200 outline-none w-32"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                title="Start Date"
              />
              <span className="text-slate-400">-</span>
              <input 
                type="date"
                className="px-2 py-3 bg-transparent border-none text-sm text-slate-700 dark:text-slate-200 outline-none w-32"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                title="End Date"
              />
            </div>

            <button 
              onClick={exportToCSV}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-500/5 transition-all border border-transparent hover:border-primary-500/20"
              title="Export to CSV"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          {role === 'Admin' && (
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Record
            </button>
          )}
        </div>
      </div>

      {/* Actual Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30">
              <th 
                className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary-500 transition-colors hidden sm:table-cell"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">Date <SortIcon column="date" /></div>
              </th>
              <th 
                className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary-500 transition-colors"
                onClick={() => handleSort('description')}
              >
                <div className="flex items-center">Description <SortIcon column="description" /></div>
              </th>
              <th className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Category</th>
              <th className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
              <th 
                className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-primary-500 transition-colors text-right md:text-left"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end md:justify-start">Amount <SortIcon column="amount" /></div>
              </th>
              {role === 'Admin' && <th className="px-4 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all group">
                <td className="px-4 md:px-8 py-5 text-sm text-slate-500 dark:text-slate-400 font-medium hidden sm:table-cell">
                  {format(new Date(t.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-4 md:px-8 py-5">
                  <p className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[120px] md:max-w-none">
                    {t.description}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold md:hidden mt-0.5">{t.category}</p>
                </td>
                <td className="px-4 md:px-8 py-5 hidden md:table-cell">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400">
                    {t.category}
                  </span>
                </td>
                <td className="px-4 md:px-8 py-5">
                  <div className={twMerge(
                    "inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                    t.type === 'Income' 
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  )}>
                    {t.type}
                  </div>
                </td>
                <td className={twMerge(
                  "px-4 md:px-8 py-5 text-sm font-black text-right md:text-left",
                  t.type === 'Income' ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                )}>
                  {t.type === 'Income' ? '+' : '-'}${new Intl.NumberFormat().format(t.amount)}
                </td>
                {role === 'Admin' && (
                  <td className="px-4 md:px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(t)}
                        className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-primary-500 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {paginatedTransactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h5 className="text-lg font-semibold text-slate-900 dark:text-white">No transactions found</h5>
            <p className="text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium">{(currentPage-1)*itemsPerPage+1}</span> to <span className="font-medium">{Math.min(currentPage*itemsPerPage, filteredTransactions.length)}</span> of <span className="font-medium">{filteredTransactions.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={twMerge(
                  "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                  currentPage === page 
                    ? "bg-primary-600 text-white"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
              >
                {page}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingId ? 'Edit Transaction' : 'New Transaction'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Type</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Expense">Expense</option>
                      <option value="Income">Income</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Date</label>
                    <input 
                      type="date"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Weekly Grocery Shopping"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Amount ($)</label>
                    <input 
                      type="number"
                      required
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 mt-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/25 transition-all active:scale-[0.98]"
                >
                  {editingId ? 'Save Changes' : 'Create Transaction'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionTable;
