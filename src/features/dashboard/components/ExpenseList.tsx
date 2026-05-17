'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

const categoryIcons: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  Entertainment: '🎬',
  Health: '🏥',
  Utilities: '💡',
  Education: '📚',
  Shopping: '🛍️',
}

const categoryColors: Record<string, string> = {
  Food: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
  Transport: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
  Entertainment: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
  Health: 'bg-red-500/20 text-red-300 border-red-400/30',
  Utilities: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  Education: 'bg-green-500/20 text-green-300 border-green-400/30',
  Shopping: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl p-8">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-700/30 to-slate-700/10 rounded-xl border border-indigo-500/20 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-3xl">{categoryIcons[expense.category] || '📌'}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-50">{expense.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium ${categoryColors[expense.category] || 'bg-slate-600/20 text-slate-400 border-slate-500/30'}`}>
                    {expense.category}
                  </span>
                  <span className="text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">₹{expense.amount.toLocaleString()}</span>
              <Button
                onClick={() => onDelete(expense.id)}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                ✕
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
