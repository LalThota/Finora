import { subDays, format } from 'date-fns';

export const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Income',
  'Investment',
  'Other'
];

export const INITIAL_TRANSACTIONS = [
  {
    id: '1',
    date: format(new Date(), 'yyyy-MM-dd'),
    amount: 1847.35,
    category: 'Income',
    type: 'Income',
    description: 'Freelance Monthly Payment'
  },
  {
    id: '2',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    amount: 45.50,
    category: 'Food & Dining',
    type: 'Expense',
    description: 'Dinner at Italian Place'
  },
  {
    id: '3',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    amount: 94.50,
    category: 'Shopping',
    type: 'Expense',
    description: 'New Backpack'
  },
  {
    id: '4',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    amount: 2463.00,
    category: 'Income',
    type: 'Income',
    description: 'Salary Deposit'
  },
  {
    id: '5',
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    amount: 284.75,
    category: 'Investment',
    type: 'Expense',
    description: 'Stock Purchase'
  },
  {
    id: '6',
    date: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
    amount: 78.20,
    category: 'Utilities',
    type: 'Expense',
    description: 'Electricity Bill'
  },
  {
    id: '7',
    date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    amount: 13.99,
    category: 'Entertainment',
    type: 'Expense',
    description: 'Netflix Subscription'
  },
  {
    id: '8',
    date: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    amount: 58.40,
    category: 'Transport',
    type: 'Expense',
    description: 'Fuel Refill'
  },
  {
    id: '10',
    date: format(subDays(new Date(), 8), 'yyyy-MM-dd'),
    amount: 12.50,
    category: 'Food & Dining',
    type: 'Expense',
    description: 'Quick Coffee & Snack'
  },
  {
    id: '11',
    date: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    amount: 487.35,
    category: 'Income',
    type: 'Income',
    description: 'Dividend Payout'
  },
  {
    id: '12',
    date: format(subDays(new Date(), 11), 'yyyy-MM-dd'),
    amount: 213.80,
    category: 'Transport',
    type: 'Expense',
    description: 'Flight Booking'
  }
];

export const CHART_DATA = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];
