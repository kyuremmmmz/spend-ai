'use client'

import { useCallback,  useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AIChatBot from './AIChatbot'
import AIInsights from './AllInsights'
import CategoryBreakdown from './CategoryBreakdown'
import ExpenseChart from './ExpensesChart'
import SpendingHistory from './SpendingHistory'
import ExpenseList from './ExpenseList'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface DashboardPageProps {
  userName: string | undefined
  signOut: ()=>void
}

export default function DashboardPage({ userName, signOut }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history'>('dashboard')
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Grocery Shopping', amount: 5200, category: 'Food', date: '2024-05-14' },
    { id: '2', description: 'Gas', amount: 3500, category: 'Transport', date: '2024-05-13' },
    { id: '3', description: 'Netflix Subscription', amount: 499, category: 'Entertainment', date: '2024-05-12' },
    { id: '4', description: 'Gym Membership', amount: 1200, category: 'Health', date: '2024-05-11' },
    { id: '5', description: 'Restaurant Dinner', amount: 2800, category: 'Food', date: '2024-05-10' },
    { id: '6', description: 'Electricity Bill', amount: 4200, category: 'Utilities', date: '2024-05-09' },
    { id: '7', description: 'Book Purchase', amount: 450, category: 'Education', date: '2024-05-08' },
    { id: '8', description: 'Coffee Shop', amount: 350, category: 'Food', date: '2024-05-07' },
  ])

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food',
  })

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return

    const expense: Expense = {
      id: Math.random().toString(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0],
    }

    setExpenses([expense, ...expenses])
    setNewExpense({ description: '', amount: '', category: 'Food' })
  }

  

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }, [setExpenses, expenses])

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-slate-950">₹</span>
            </div>
            <h1 className="text-xl font-bold">FinanceAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Welcome, <span className="text-emerald-400 font-semibold">{userName}</span></span>
            <Button
              onClick={signOut}
              variant="outline"
              className="border-slate-600/50 text-slate-300 hover:bg-slate-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section with Tabs */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Your Financial Dashboard</h2>
          <p className="text-slate-400 mb-6">Track spending, get AI insights, and manage expenses smarter</p>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700/50'
              }`}
            >
              History
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700/50 backdrop-blur-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ₹{totalExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-2">This month</p>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700/50 backdrop-blur-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-cyan-400">{expenses.length}</p>
            <p className="text-xs text-slate-500 mt-2">All time</p>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 border-slate-700/50 backdrop-blur-xl p-6">
            <p className="text-slate-400 text-sm mb-1">Avg. per Expense</p>
            <p className="text-3xl font-bold text-emerald-400">
              ₹{Math.round(totalExpenses / expenses.length)}
            </p>
            <p className="text-xs text-slate-500 mt-2">Average amount</p>
          </Card>
        </div>

        {/* Add Expense Section */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="bg-slate-700/50 border-slate-600/50 text-slate-50 placeholder-slate-400"
            />
            <Input
              placeholder="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="bg-slate-700/50 border-slate-600/50 text-slate-50 placeholder-slate-400 sm:w-32"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="bg-slate-700/50 border border-slate-600/50 text-slate-50 rounded-md px-3 sm:w-40"
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Utilities</option>
              <option>Education</option>
              <option>Shopping</option>
            </select>
            <Button
              onClick={handleAddExpense}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
            >
              Add
            </Button>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <ExpenseChart expenses={expenses} />
            <CategoryBreakdown expenses={expenses} />
          </div>

          {/* Right Column - Insights and Recent */}
          <div className="space-y-6">
            <AIInsights expenses={expenses} />
          </div>
        </div>

            {/* Recent Expenses */}
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <SpendingHistory expenses={expenses} onDelete={handleDeleteExpense} />
        )}
      </div>

      {/* AI ChatBot - Always visible */}
      <AIChatBot expenses={expenses} />
    </div>
  )
}
