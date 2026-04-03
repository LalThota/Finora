import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Zap, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Insights = () => {
  const { transactions, stats, budgets } = useApp();

  const insights = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    if (expenses.length === 0) return [];

    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

    const savingsRate = stats.totalIncome > 0 
      ? ((stats.totalIncome - stats.totalExpenses) / stats.totalIncome * 100).toFixed(1)
      : 0;

    const list = [
      {
        title: 'Alpha AI Forecast',
        value: `+$${new Intl.NumberFormat().format(stats.forecast.predictedBalance)}`,
        description: `Projected growth: 5% income increase with 2% efficiency gain next month.`,
        icon: Zap,
        color: 'emerald'
      },
      {
        title: 'Top Expense',
        value: topCategory[0],
        description: `High impact detected. $${new Intl.NumberFormat().format(topCategory[1])} spent on ${topCategory[0]}.`,
        icon: AlertTriangle,
        color: 'rose'
      },
      {
        title: 'Efficiency Score',
        value: `${savingsRate}%`,
        description: savingsRate > 20 
          ? 'Exceptional. Your savings rate is in the top 5% of users.'
          : 'Optimization required. Focus on reducing fixed costs.',
        icon: CheckCircle2,
        color: savingsRate > 20 ? 'emerald' : 'amber'
      }
    ];

    // Budget Alerts
    budgets.forEach(b => {
      const actual = categoryTotals[b.category] || 0;
      if (actual > b.limit) {
        list.push({
          title: 'Budget Alert',
          value: b.category,
          description: `Critical: Over budget by $${actual - b.limit}. Immediate attention required.`,
          icon: AlertTriangle,
          color: 'rose'
        });
      }
    });

    return list;
  }, [transactions, stats, budgets]);

  return (
    <div className={twMerge(
      "grid grid-cols-1 gap-6 md:gap-8",
      insights.length > 0 ? "md:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-1"
    )}>
      {insights.length > 0 ? (
        insights.map((insight, idx) => {
          const Icon = insight.icon || Zap;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-[2.5rem] glass-morphism card-hover overflow-hidden border border-white/5 dark:border-white/10"
            >
              {/* Background Glow */}
              <div className={twMerge(
                "absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-opacity duration-700 group-hover:opacity-40",
                insight.color === 'rose' ? "bg-rose-500" :
                insight.color === 'emerald' ? "bg-emerald-500" :
                "bg-amber-500"
              )} />

              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="flex items-center justify-between">
                  <div className={twMerge(
                    "p-4 rounded-2xl relative",
                    insight.color === 'rose' ? "bg-rose-500/10 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]" :
                    insight.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]" :
                    "bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/5 dark:border-white/5">
                     <span className={twMerge(
                       "w-1.5 h-1.5 rounded-full animate-pulse",
                       insight.color === 'rose' ? "bg-rose-500" :
                       insight.color === 'emerald' ? "bg-emerald-500" :
                       "bg-amber-500"
                     )} />
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                      {insight.title}
                    </span>
                  </div>
                  <h5 className="text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight mb-3">
                    {insight.value}
                  </h5>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%]">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })
      ) : (
        <div className="glass rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800">
           <Zap className="w-12 h-12 text-slate-300 mx-auto mb-6 opacity-40" />
           <h3 className="text-xl font-bold text-slate-400">Intelligence Pending...</h3>
           <p className="text-sm text-slate-500 mt-2">Process more data to unlock deeper financial insights.</p>
        </div>
      )}
    </div>
  );
};

export default Insights;
