import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../store/GlobalContext';
import { Wallet, Target } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const BudgetProgress = () => {
  const { transactions, budgets } = useGlobalContext();

  const progressData = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    
    return budgets.map(b => {
      const actual = expenses
        .filter(t => t.category === b.category)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const percentage = Math.min((actual / b.limit) * 100, 100);
      
      return {
        ...b,
        actual,
        percentage
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [transactions, budgets]);

  return (
    <div className="glass rounded-[2rem] p-8 space-y-6 card-hover shadow-xl shadow-primary-500/5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white font-heading tracking-tight">Active Budgets</h4>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Goal Alignment</p>
        </div>
        <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500">
           <Target className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-6">
        {progressData.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span className="text-slate-500 dark:text-slate-400">{item.category}</span>
              <span className={twMerge(
                "transition-colors",
                item.percentage > 90 ? "text-rose-500" : item.percentage > 70 ? "text-amber-500" : "text-emerald-500"
              )}>
                ${Math.round(item.actual)} / ${item.limit}
              </span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative shadow-inner">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${item.percentage}%` }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className={twMerge(
                   "h-full rounded-full relative",
                   item.percentage > 90 ? "bg-gradient-to-r from-rose-500 to-rose-400" : 
                   item.percentage > 70 ? "bg-gradient-to-r from-amber-500 to-amber-400" : 
                   "bg-gradient-to-r from-emerald-500 to-primary-500"
                 )}
               >
                 <div className="absolute inset-0 bg-white/20 animate-pulse" />
               </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60">
        <button className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-500 transition-colors">
          Manage Budget Goals
        </button>
      </div>
    </div>
  );
};

export default BudgetProgress;
