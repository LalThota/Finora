import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const SummaryCard = ({ title, value, type, trend, icon: Icon, isLoading, isPercentage }) => {
  const isIncome = type === 'income';
  const isExpense = type === 'expense';
  const isBalance = type === 'balance';

  if (isLoading) {
    return (
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 glass overflow-hidden h-full">
        <div className="animate-pulse flex flex-col h-full justify-between gap-5 sm:gap-8">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="w-16 h-6 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
          <div>
            <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
            <div className="w-32 h-8 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={twMerge(
        "relative rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 card-hover glass group overflow-hidden h-full",
        isIncome ? "hover:border-emerald-500/50" : isExpense ? "hover:border-rose-500/50" : "hover:border-primary-500/50"
      )}
    >
      <div className="flex flex-col h-full justify-between gap-5 sm:gap-8">
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
            "shrink-0 flex items-center gap-1 px-2 py-1.5 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] font-black uppercase tracking-widest",
            trend > 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        </div>

        <div>
          <p className="text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1 sm:mb-2 truncate">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
             {!isPercentage && <span className="text-[10px] sm:text-sm font-bold text-slate-400 dark:text-slate-500">$</span>}
             <h3 className="text-2xl min-[360px]:text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter truncate">
                {isPercentage ? value : Number(value).toFixed(2)}{isPercentage && '%'}
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
