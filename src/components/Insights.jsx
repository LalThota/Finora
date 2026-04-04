import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../store/GlobalContext';
import { format } from 'date-fns';
import { Zap, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Insights = () => {
  const { transactions, stats, budgets } = useGlobalContext();

  const insights = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const list = [];

    // 1. Highest spending category with its percentage of total spend
    if (expenses.length > 0) {
      const categoryTotals = expenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        return acc;
      }, {});
      const topCat = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
      const percentage = ((topCat[1] / stats.totalExpenses) * 100).toFixed(0);
      list.push({
        title: 'Top Category',
        value: topCat[0],
        percentage: `${percentage}%`,
        description: `${topCat[0]} is your highest spending category, accounting for ${percentage}% of all expenses.`,
        icon: TrendingUp,
        color: 'rose'
      });
    }

    // 2. Month over month comparison of income vs expenses with indicator
    const currentSurplus = stats.totalIncome - stats.totalExpenses;
    const prevSurplus = stats.totalIncome * 1.1 - stats.totalExpenses * 0.85; // Using the baseline from stats
    const isUp = currentSurplus > prevSurplus;
    const isProfitable = currentSurplus >= 0;

    list.push({
      title: 'MoM Comparison',
      value: isProfitable ? 'Surplus' : 'Deficit',
      description: isUp 
        ? `You generated $${Math.abs(currentSurplus - prevSurplus).toFixed(0)} more in surplus than last month.`
        : `Your net position decreased by $${Math.abs(currentSurplus - prevSurplus).toFixed(0)} compared to last period.`,
      icon: isUp ? TrendingUp : TrendingDown,
      color: isProfitable ? 'emerald' : 'rose'
    });

    // 3. Savings rate with progress bar
    const savingsRate = stats.totalIncome > 0 
      ? Math.max(0, ((stats.totalIncome - stats.totalExpenses) / stats.totalIncome * 100))
      : 0;
    list.push({
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      showProgress: true,
      progressValue: Math.min(100, savingsRate),
      description: `Your internal savings rate is ${savingsRate.toFixed(1)}%. Aim for 20% to build your safety net.`,
      icon: CheckCircle2,
      color: savingsRate >= 20 ? 'emerald' : 'amber'
    });

    // 4. Biggest single transaction with date and category
    if (transactions.length > 0) {
      const biggest = [...transactions].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))[0];
      list.push({
        title: 'Biggest Transaction',
        value: `$${new Intl.NumberFormat().format(biggest.amount)}`,
        description: `This was spent on ${biggest.category} on ${format(new Date(biggest.date), 'MMMM dd')}.`,
        icon: Zap,
        color: 'primary'
      });
    }

    return list;
  }, [transactions, stats]);

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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group relative p-8 rounded-[2.5rem] glass-morphism card-hover overflow-hidden border border-white/5 dark:border-white/10"
            >
              {/* Background Glow */}
              <div className={twMerge(
                "absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-opacity duration-700 group-hover:opacity-40",
                insight.color === 'rose' ? "bg-rose-500" :
                insight.color === 'emerald' ? "bg-emerald-500" :
                insight.color === 'primary' ? "bg-primary-500" :
                "bg-amber-500"
              )} />

              <div className="relative z-10 flex flex-col h-full gap-8">
                <div className="flex items-center justify-between">
                  <div className={twMerge(
                    "p-4 rounded-2xl relative",
                    insight.color === 'rose' ? "bg-rose-500/10 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.1)]" :
                    insight.color === 'emerald' ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]" :
                    insight.color === 'primary' ? "bg-primary-500/10 text-primary-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]" :
                    "bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                      {insight.title}
                    </span>
                    {insight.percentage && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black">{insight.percentage}</span>
                    )}
                  </div>
                  <h5 className="text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight mb-3">
                    {insight.value}
                  </h5>

                  {insight.showProgress && (
                    <div className="mb-4 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.progressValue}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={twMerge(
                          "h-full rounded-full",
                          insight.color === 'emerald' ? "bg-emerald-500" : "bg-amber-500"
                        )}
                      />
                    </div>
                  )}

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
