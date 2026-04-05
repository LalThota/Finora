import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, LayoutDashboard, CreditCard, PieChart, 
  Settings, LogOut, Sun, Moon, Shield, Eye, HelpCircle, X
} from 'lucide-react';
import { useGlobalContext } from '../store/GlobalContext';
import { twMerge } from 'tailwind-merge';

const Sidebar = () => {
  const { role, setRole, darkMode, setDarkMode, activeView, setActiveView, userProfile, showMobileMenu, setShowMobileMenu } = useGlobalContext();

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const menuItems = [
    { title: 'Overview', icon: LayoutDashboard },
    { title: 'Transactions', icon: CreditCard },
    { title: 'Analytics', icon: PieChart },
    { title: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      <aside className={twMerge(
        "fixed top-0 left-0 h-screen z-[70] p-4 transition-all duration-500",
        showMobileMenu ? "translate-x-0 w-[280px]" : "-translate-x-full lg:translate-x-0 lg:w-80"
      )}>
        <div className="w-full h-full glass rounded-[2.5rem] flex flex-col pointer-events-auto overflow-hidden border-none shadow-2xl dark:bg-slate-900/60 transition-all duration-500">
          {/* Brand Logo */}
          <div className="p-8 pb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-primary-500/30 flex-shrink-0">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  Finora<span className="text-primary-500">.</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500 mt-1">Intelligence</p>
              </div>
            </div>
            
            {/* Close Mobile Menu */}
            <button 
              onClick={() => setShowMobileMenu(false)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = activeView === item.title;
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    setActiveView(item.title);
                    if (window.innerWidth < 1024) setShowMobileMenu(false);
                  }}
                  className={twMerge(
                    "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                    isActive 
                      ? "bg-primary-600 dark:bg-primary-500 text-white shadow-xl shadow-primary-500/25 font-bold scale-[1.02]" 
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                  )}
                >
                  <item.icon className={twMerge(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:scale-110"
                  )} />
                  <span className="text-sm">{item.title}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-primary-600 dark:bg-primary-500 rounded-2xl -z-10"
                    />
                  )}
                </button>
              );
            })}

            {/* System Info Spacer */}
            <div className="flex-1" />
          </nav>

          {/* Bottom Section */}
          <div className="p-6 space-y-4">
            {/* Support Link */}
            <button 
              onClick={() => {
                setActiveView('Help');
                if (window.innerWidth < 1024) setShowMobileMenu(false);
              }}
              className={twMerge(
                "flex w-full items-center gap-4 px-4 py-3 rounded-2xl transition-all group",
                activeView === 'Help' ? "bg-primary-500 text-white" : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-600"
              )}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Help Center</span>
            </button>



            <div className="flex items-center gap-3 p-3 rounded-[1.5rem] bg-slate-900 dark:bg-slate-800 text-white shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-primary-600 flex items-center justify-center font-bold text-sm shadow-inner group cursor-pointer overflow-hidden">
                <motion.div whileHover={{ scale: 1.1 }} className="flex items-center justify-center w-full h-full">
                  {getInitials(userProfile.name)}
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{userProfile.name}</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[10px] text-slate-400 truncate uppercase tracking-tighter">{role}</p>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
