import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingUp, TrendingDown, Bell, 
  Calendar, Search, Filter, ArrowUpRight, 
  MoreHorizontal, ChevronRight, Zap, Menu, Sun, Moon
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import ChartSection from '../components/ChartSection';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import BudgetProgress from '../components/BudgetProgress';
import Sidebar from '../components/Sidebar';
import { useGlobalContext } from '../store/GlobalContext';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

const Dashboard = () => {
  const { 
    stats, role, setRole, activeView, userProfile, setUserProfile, 
    notifications, setNotifications, setShowMobileMenu, toast, 
    isGlobalLoading, darkMode, setDarkMode 
  } = useGlobalContext();

  const savingsRate = stats.totalIncome > 0 
    ? ((stats.totalIncome - stats.totalExpenses) / stats.totalIncome * 100).toFixed(1)
    : 0;

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
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <SummaryCard 
                title="Total Balance" 
                value={stats.balance} 
                type="balance" 
                trend={+12.4} 
                icon={Wallet} 
                isLoading={isGlobalLoading}
              />
              <SummaryCard 
                title="Monthly Income" 
                value={stats.totalIncome} 
                type="income" 
                trend={+8.2} 
                icon={TrendingUp} 
                isLoading={isGlobalLoading}
              />
              <SummaryCard 
                title="Monthly Expenses" 
                value={stats.totalExpenses} 
                type="expense" 
                trend={-4.1} 
                icon={TrendingDown} 
                isLoading={isGlobalLoading}
              />
              <SummaryCard 
                title="Savings Rate (%)" 
                value={savingsRate} 
                type="balance" 
                trend={+2.1} 
                icon={Zap} 
                isLoading={isGlobalLoading}
                isPercentage={true}
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
              <div className="glass rounded-[2.5rem] p-8 space-y-6 shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="text-xl font-black font-heading tracking-tight text-slate-900 dark:text-white">Direct Access</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Administrative Lead</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">admin@finora-intel.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="p-4 rounded-2xl bg-primary-500/10 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Queries</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100">+1 (800) 555-0199</p>
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
      
      <main className="flex-1 lg:ml-80 ml-0 p-4 sm:p-6 lg:p-12 pb-24 relative z-10 w-full overflow-hidden sm:overflow-visible">
        {/* Header */}
        <header className="sticky top-0 z-40 mb-8 md:mb-12 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-4 glass-header backdrop-blur-3xl">
          <div className="flex flex-col gap-4">
            {/* Top Row: Menu, Title, and Profile */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 sm:gap-4 truncate mr-2">
                <button 
                  onClick={() => setShowMobileMenu(true)}
                  className="lg:hidden p-2.5 sm:p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 text-slate-500 hover:text-primary-500 transition-colors border border-white/20"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate"
                >
                  <div className="hidden min-[400px]:flex items-center gap-2 text-[10px] font-black text-primary-500 uppercase tracking-[0.2em] mb-0.5">
                    <div className="w-4 h-[2px] bg-primary-500/30" />
                    Nexus Intelligence
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
                    {activeView}
                  </h2>
                </motion.div>
              </div>

              {/* Mobile Profile & Actions */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div className="hidden min-[450px]:flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/20 text-[10px] font-bold text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-primary-500" />
                  <span>{format(new Date(), 'MMM dd')}</span>
                </div>

                <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 ml-1">
                  <div className="text-right hidden sm:block">
                    <p className="text-[11px] font-black text-slate-900 dark:text-white leading-tight uppercase">{userProfile.name}</p>
                    <p className="text-[9px] text-primary-500 font-bold uppercase tracking-widest leading-none mt-0.5">{role}</p>
                  </div>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-[1.25rem] relative overflow-hidden ring-2 ring-primary-500/10 shadow-lg shadow-primary-500/5 active:scale-95 transition-all">
                    <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Role Switcher & Analytics (Visible only in md or stacked in sm) */}
            <div className="flex items-center justify-between min-[500px]:justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/40 md:border-none md:pt-0">
               {/* Fixed Role Switcher Container */}
               <div className="flex-1 min-[500px]:flex-initial flex items-center p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl">
                  <button
                    onClick={() => setRole('Admin')}
                    className={twMerge(
                      "flex-1 min-[500px]:px-5 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                      role === 'Admin' ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Admin
                  </button>
                  <button
                    onClick={() => setRole('Viewer')}
                    className={twMerge(
                      "flex-1 min-[500px]:px-5 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                      role === 'Viewer' ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    Viewer
                  </button>
                </div>
                
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex-shrink-0 p-3 bg-white/50 dark:bg-slate-800/50 rounded-2xl hover:scale-110 active:scale-95 transition-all group border border-white/20"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" /> : <Moon className="w-5 h-5 text-slate-400 group-hover:-rotate-12 transition-transform" />}
                </button>

                <button className="flex-shrink-0 relative p-3 bg-white/50 dark:bg-slate-800/50 rounded-2xl hover:scale-110 active:scale-95 transition-all group border border-white/20">
                  <Bell className="w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full" />
                </button>
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
              toast.type === 'success' ? "bg-emerald-500" : 
              toast.type === 'delete' || toast.type === 'error' ? "bg-rose-500" : "bg-primary-500"
            )} />
            <p className="text-sm font-bold tracking-tight">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
