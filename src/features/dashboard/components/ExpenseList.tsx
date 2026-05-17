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
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-2xl">{categoryIcons[expense.category] || '📌'}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-50">{expense.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${categoryColors[expense.category] || 'bg-slate-600/20 text-slate-400 border-slate-500/30'}`}>
                    {expense.category}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-emerald-400">₹{expense.amount.toLocaleString()}</span>
              <Button
                onClick={() => onDelete(expense.id)}
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
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
