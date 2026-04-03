import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useApp } from '../context/AppContext';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#64748b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium" style={{ color: entry.color }}>{entry.name}</span>
              <span className="text-sm font-black dark:text-white">${new Intl.NumberFormat().format(entry.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const ChartSection = () => {
  const { transactions, setSearchTerm, setActiveView } = useApp();

  const handleSliceClick = (data) => {
    if (data && data.name) {
      setSearchTerm(data.name);
      setActiveView('Transactions');
    }
  };

  const categoryData = React.useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const categories = Array.from(new Set(expenses.map(t => t.category)));
    
    return categories.map(cat => ({
      name: cat,
      value: expenses
        .filter(t => t.category === cat)
        .reduce((sum, t) => sum + parseFloat(t.amount), 0)
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const trendData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayTransactions = transactions.filter(t => t.date === date);
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        Income: dayTransactions
          .filter(t => t.type === 'Income')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0),
        Expenses: dayTransactions
          .filter(t => t.type === 'Expense')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0)
      };
    });
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Area Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2 glass rounded-[2rem] p-8 card-hover"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Financial Activity</h4>
            <p className="text-sm text-slate-400">Cash flow analysis for the past 7 days</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500" />
              <span className="text-xs font-bold text-slate-400 uppercase">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-xs font-bold text-slate-400 uppercase">Expenses</span>
            </div>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.1} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '5 5' }} />
              <Area 
                type="monotone" 
                dataKey="Income" 
                stroke="#3b82f6" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                animationDuration={2000}
              />
              <Area 
                type="monotone" 
                dataKey="Expenses" 
                stroke="#f43f5e" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorExpense)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-[2rem] p-8 card-hover"
      >
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Category Distribution</h4>
        <p className="text-sm text-slate-400 mb-8">Where your money goes</p>
        
        <div className="h-64 w-full relative">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  onClick={handleSliceClick}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} className="cursor-pointer outline-none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm italic">
              No categories to show
            </div>
          )}
          {categoryData.length > 0 && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                   {categoryData.length}
                </p>
                <p className="text-[10px] uppercase font-bold text-slate-400">Categories</p>
             </div>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {categoryData.slice(0, 4).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
              </div>
              <span className="text-sm font-bold">${new Intl.NumberFormat().format(item.value)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ChartSection;
