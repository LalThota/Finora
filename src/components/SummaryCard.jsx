import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const SummaryCard = ({ title, value, type, trend, icon: Icon }) => {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';
  const isBalance = type === 'balance';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={twMerge(
        "relative rounded-[2.5rem] p-6 sm:p-8 card-hover glass group overflow-hidden h-full",
        isIncome ? "hover:border-emerald-500/50" : isExpense ? "hover:border-rose-500/50" : "hover:border-primary-500/50"
      )}
    >
      <div className="flex flex-col h-full justify-between gap-6 sm:gap-8">
        <div className="flex items-center justify-between">
          <div className={twMerge(
            "p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110",
            isIncome ? "bg-emerald-500/10 text-emerald-500" :
            isExpense ? "bg-rose-500/10 text-rose-500" :
            "bg-primary-500/10 text-primary-500"
          )}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className={twMerge(
            "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
            trend > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        </div>

        <div>
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
             <span className="text-xs sm:text-sm font-bold text-slate-400 dark:text-slate-500">$</span>
             <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {new Intl.NumberFormat().format(value)}
             </h3>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={twMerge(
        "absolute -right-20 -bottom-20 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-700 group-hover:opacity-40",
        isIncome ? "bg-emerald-500" : isExpense ? "bg-rose-500" : "bg-primary-500"
      )} />
    </motion.div>
  );
};

export default SummaryCard;
