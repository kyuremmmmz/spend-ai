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

interface SpendingHistoryProps {
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

export default function SpendingHistory({
  expenses,
  onDelete,
}: SpendingHistoryProps) {
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Group by date
  const groupedExpenses: Record<string, Expense[]> = {}
  sortedExpenses.forEach((expense) => {
    if (!groupedExpenses[expense.date]) {
      groupedExpenses[expense.date] = []
    }
    groupedExpenses[expense.date].push(expense)
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Spending History</h2>
        <p className="text-slate-400 text-lg">Complete timeline of all your expenses</p>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedExpenses).map(([date, dayExpenses]) => (
          <div key={date}>
            <div className="flex items-center gap-4 mb-4 px-4">
              <h3 className="text-lg font-bold text-slate-200">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </h3>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
            </div>

            <div className="space-y-3 mb-4">
              {dayExpenses.map((expense) => (
                <Card
                  key={expense.id}
                  className="bg-gradient-to-r from-slate-700/30 to-slate-700/10 border border-indigo-500/20 p-5 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-4xl">
                        {categoryIcons[expense.category] || '📌'}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-50">
                          {expense.description}
                        </p>
                        <span
                          className={`inline-block text-xs px-3 py-1 rounded-full border mt-2 font-medium ${
                            categoryColors[expense.category] ||
                            'bg-slate-600/20 text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        ₹{expense.amount.toLocaleString()}
                      </span>
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
                </Card>
              ))}
            </div>

            <div className="px-6 py-4 mx-2 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-xl border border-indigo-500/20">
              <p className="text-sm text-slate-300">
                <span className="text-slate-400">Daily total:</span>{' '}
                <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  ₹{dayExpenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
