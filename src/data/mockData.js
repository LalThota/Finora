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
    amount: 1500,
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
    amount: 120.00,
    category: 'Shopping',
    type: 'Expense',
    description: 'New Backpack'
  },
  {
    id: '4',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    amount: 2500,
    category: 'Income',
    type: 'Income',
    description: 'Salary Deposit'
  },
  {
    id: '5',
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    amount: 300.00,
    category: 'Investment',
    type: 'Expense',
    description: 'Stock Purchase'
  },
  {
    id: '6',
    date: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
    amount: 85.00,
    category: 'Utilities',
    type: 'Expense',
    description: 'Electricity Bill'
  },
  {
    id: '7',
    date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    amount: 15.00,
    category: 'Entertainment',
    type: 'Expense',
    description: 'Netflix Subscription'
  },
  {
    id: '8',
    date: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    amount: 50.00,
    category: 'Transport',
    type: 'Expense',
    description: 'Fuel Refill'
  },
  {
    id: '9',
    date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    amount: 200.00,
    category: 'Health',
    type: 'Expense',
    description: 'Gym Membership'
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
    amount: 500.00,
    category: 'Income',
    type: 'Income',
    description: 'Dividend Payout'
  },
  {
    id: '12',
    date: format(subDays(new Date(), 11), 'yyyy-MM-dd'),
    amount: 220.00,
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
