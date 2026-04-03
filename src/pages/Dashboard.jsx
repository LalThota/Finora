import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingUp, TrendingDown, Bell, 
  Calendar, Search, Filter, ArrowUpRight, 
  MoreHorizontal, ChevronRight, Zap, Menu
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import ChartSection from '../components/ChartSection';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import BudgetProgress from '../components/BudgetProgress';
import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

const Dashboard = () => {
  const { stats, role, activeView, userProfile, setUserProfile, notifications, setNotifications, setShowMobileMenu, toast } = useApp();

  const renderContent = () => {
    switch(activeView) {
      case 'Overview':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <SummaryCard 
                title="Total Balance" 
                value={stats.balance} 
                type="balance" 
                trend={+12.4} 
                icon={Wallet} 
              />
              <SummaryCard 
                title="Monthly Income" 
                value={stats.totalIncome} 
                type="income" 
                trend={+8.2} 
                icon={TrendingUp} 
              />
              <SummaryCard 
                title="Monthly Expenses" 
                value={stats.totalExpenses} 
                type="expense" 
                trend={-4.1} 
                icon={TrendingDown} 
              />
            </section>

            {/* Charts & Breakdown */}
            <ChartSection />

            {/* Smart Metrics Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
               <Insights />
               <BudgetProgress />
            </div>

            {/* Recent Transactions Snippet */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-heading tracking-tight sm:text-2xl">
                    <Zap className="w-5 h-5 text-primary-500" />
                    Recent Activity
                  </h3>
               </div>
               <TransactionTable />
            </div>
          </motion.div>
        );
      case 'Transactions':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
          >
            <TransactionTable />
          </motion.div>
        );
      case 'Analytics':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <ChartSection />
            <Insights />
          </motion.div>
        );
      case 'Settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Profile Section */}
            <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 space-y-8 shadow-2xl shadow-primary-500/5">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl relative overflow-hidden ring-4 ring-primary-500/10 active:scale-95 transition-all cursor-pointer group shadow-xl">
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold uppercase">Change</div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading leading-tight">{userProfile.name}</h3>
                  <p className="text-primary-500 font-bold text-sm uppercase tracking-widest">{userProfile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-slate-800/40">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={userProfile.name} 
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={userProfile.email} 
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium"
                  />
                </div>
                <div className="space-y-3 lg:col-span-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Job Title</label>
                  <input 
                    type="text" 
                    value={userProfile.role} 
                    onChange={(e) => setUserProfile({...userProfile, role: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button className="px-10 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-500/25 active:scale-95 transition-all">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Notification Toggles */}
            <div className="glass rounded-[2.5rem] p-8 space-y-8 h-fit shadow-2xl shadow-emerald-500/5">
              <h4 className="text-lg font-black text-slate-900 dark:text-white font-heading uppercase tracking-wider">Preferences</h4>
              
              <div className="space-y-6">
                {[
                  { id: 'emailAlerts', label: 'Email Alerts', desc: 'Critical activity notifications' },
                  { id: 'weeklyReport', label: 'Weekly Report', desc: 'Get your spending summary' },
                  { id: 'securityLogs', label: 'Security Logs', desc: 'Alerts for login attempts' }
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between group">
                    <div className="min-w-0 pr-4">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{pref.label}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{pref.desc}</p>
                    </div>
                    <button 
                      onClick={() => setNotifications({...notifications, [pref.id]: !notifications[pref.id]})}
                      className={twMerge(
                        "w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner",
                        notifications[pref.id] ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-800"
                      )}
                    >
                      <div className={twMerge(
                        "w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300 shadow-md",
                        notifications[pref.id] ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'Help':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Contact Form */}
            <div className="lg:col-span-3 glass rounded-[2.5rem] p-10 space-y-10 shadow-2xl">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white font-heading">Support Ticket</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Our engineers are standing by 24/7 to assist with your financial intelligence suite.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Topic</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium appearance-none">
                      <option>Technical Issue</option>
                      <option>Account Support</option>
                      <option>Feature Request</option>
                      <option>Data Correction</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium appearance-none">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message Detail</label>
                  <textarea 
                    rows="5"
                    placeholder="Describe your issue in detail..."
                    className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none transition-all dark:text-white font-medium resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                  ></textarea>
                </div>

                <button className="w-full py-5 bg-gradient-to-r from-primary-600 to-emerald-500 hover:scale-[1.01] active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-500/30 transition-all uppercase tracking-widest">
                  Initialize Support Request
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                <h4 className="text-xl font-black font-heading tracking-tight">Direct Access</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="p-4 rounded-2xl bg-white/10 text-emerald-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Administrative Lead</p>
                      <p className="text-lg font-bold">admin@nexuspay.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-4 rounded-2xl bg-white/10 text-primary-400 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Global Queries</p>
                      <p className="text-lg font-bold">+1 (800) 555-0199</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-xl border-none">
                <h5 className="font-black font-heading text-slate-800 dark:text-white uppercase tracking-wider text-xs">Knowledge Base & Intelligence</h5>
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sample Intelligence Queries</p>
                  <div className="grid gap-2">
                    {[
                      'Predict cash flow for next 30 days',
                      'High-risk category detection',
                      'Automated audit logs access',
                      'Anomalous expense patterns'
                    ].map((q, idx) => (
                      <button key={idx} className="text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all border border-slate-200 dark:border-slate-800">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Recent Search intelligence</p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold text-primary-500">
                    <span className="px-2 py-1 rounded-md bg-primary-500/10 cursor-pointer">Tax Audit 2024</span>
                    <span className="px-2 py-1 rounded-md bg-primary-500/10 cursor-pointer">Cloud Subscriptions</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <Zap className="w-16 h-16 mb-4 opacity-10 animate-pulse" />
            <h3 className="text-2xl font-black font-heading text-slate-300 dark:text-slate-800 uppercase tracking-widest">Coming Soon</h3>
            <p className="text-sm font-medium">Dynamic settings for {activeView} is arriving in version 2.1.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Decorative Background */}
      <div className="mesh-bg">
        <div className="mesh-blob blob-1" />
        <div className="mesh-blob blob-2" />
        <div className="mesh-blob blob-3" />
        <div className="mesh-blob blob-4" />
        <div className="mesh-blob blob-5" />
        <div className="mesh-blob blob-6" />
      </div>

      <Sidebar />
      
      <main className="flex-1 lg:ml-80 ml-0 p-6 lg:p-12 pb-24 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8 sticky top-0 py-4 glass-header -mx-6 lg:-mx-12 px-6 lg:px-12 backdrop-blur-3xl z-40">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 text-slate-500 hover:text-primary-500 transition-colors border border-white/20"
            >
              <Menu className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-primary-500 uppercase tracking-[0.2em] mb-1">
                <div className="w-8 h-[2px] bg-primary-500/30" />
                Intelligence Dashboard
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {activeView}
              </h2>
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800/20 shadow-sm text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(), 'EEE, MMM dd')}</span>
            </div>
            
            <button className="relative p-3 glass rounded-2xl hover:scale-105 active:scale-95 transition-all group">
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary-500 transition-colors" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full" />
            </button>
            
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800 ml-2">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{userProfile.name}</p>
                <p className="text-[10px] text-primary-500 font-bold uppercase tracking-widest leading-none mt-0.5">{role}</p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-[1.25rem] relative overflow-hidden group cursor-pointer shadow-xl shadow-primary-500/10 active:scale-95 transition-all">
                <img 
                  src={userProfile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-400">
            &copy; {new Date().getFullYear()} Finora Intelligence. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-primary-500 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-primary-500 transition-colors">Terms</a>
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-primary-500 transition-colors">Support</a>
          </div>
        </footer>
      </main>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={twMerge(
              "fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border backdrop-blur-xl",
              toast.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-slate-900 border-slate-800 text-white"
            )}
          >
            <div className={twMerge(
              "w-2 h-2 rounded-full animate-pulse",
              toast.type === 'success' ? "bg-emerald-500" : "bg-primary-500"
            )} />
            <p className="text-sm font-bold tracking-tight">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
