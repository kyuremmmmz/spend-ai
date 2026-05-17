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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Spending History</h2>
        <p className="text-slate-400">Complete timeline of all your expenses</p>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedExpenses).map(([date, dayExpenses]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-slate-300 mb-3 px-4">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>

            <div className="space-y-2">
              {dayExpenses.map((expense) => (
                <Card
                  key={expense.id}
                  className="bg-slate-800/30 border-slate-700/50 p-4 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-3xl">
                        {categoryIcons[expense.category] || '📌'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-slate-50">
                          {expense.description}
                        </p>
                        <span
                          className={`inline-block text-xs px-2.5 py-1 rounded-full border mt-2 ${
                            categoryColors[expense.category] ||
                            'bg-slate-600/20 text-slate-400 border-slate-500/30'
                          }`}
                        >
                          {expense.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{expense.amount.toLocaleString()}
                      </span>
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
                </Card>
              ))}
            </div>

            <div className="px-4 py-3 mt-2 bg-slate-800/20 rounded-lg border border-slate-700/30">
              <p className="text-sm text-slate-400">
                Day total:{' '}
                <span className="font-semibold text-emerald-400">
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
