'use client'

import { useState } from 'react'
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
  onLogout: () => void
}

export default function DashboardPage({ userName, onLogout }: DashboardPageProps) {
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

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/30 backdrop-blur-2xl bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-lg font-bold text-white">₹</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">FinanceAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Welcome, <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-semibold">{userName}</span></span>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-indigo-500/30 text-slate-300 hover:bg-indigo-500/10 hover:text-cyan-400 transition-all"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section with Tabs */}
        <div>
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Your Financial Dashboard</h2>
            <p className="text-slate-400 text-lg">Track spending, get AI insights, and manage expenses smarter</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-3 mb-8 border-b border-slate-700/50 pb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 font-semibold text-sm transition-all duration-300 relative ${
                activeTab === 'dashboard'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              Dashboard
              {activeTab === 'dashboard' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-t"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 font-semibold text-sm transition-all duration-300 relative ${
                activeTab === 'history'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              History
              {activeTab === 'history' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-t"></div>
              )}
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-indigo-500/10 to-slate-800/50 border border-indigo-500/30 backdrop-blur-xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-2">Total Expenses</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              ₹{totalExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-3">This month</p>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-slate-800/50 border border-cyan-500/30 backdrop-blur-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-2">Total Transactions</p>
            <p className="text-4xl font-bold text-cyan-400">{expenses.length}</p>
            <p className="text-xs text-slate-500 mt-3">All time</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-slate-800/50 border border-purple-500/30 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-lg">📈</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-2">Avg. per Expense</p>
            <p className="text-4xl font-bold text-purple-400">
              ₹{Math.round(totalExpenses / expenses.length)}
            </p>
            <p className="text-xs text-slate-500 mt-3">Average amount</p>
          </Card>
        </div>

        {/* Add Expense Section */}
        <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl p-8">
          <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Add New Expense</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Description (e.g. Groceries)"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="bg-slate-700/50 border-slate-600/50 text-slate-50 placeholder-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/30 transition-all"
            />
            <Input
              placeholder="Amount"
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="bg-slate-700/50 border-slate-600/50 text-slate-50 placeholder-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/30 transition-all sm:w-40"
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              className="bg-slate-700/50 border border-slate-600/50 text-slate-50 rounded-md px-4 focus:border-indigo-500/50 focus:ring-indigo-500/30 transition-all sm:w-44"
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
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
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
