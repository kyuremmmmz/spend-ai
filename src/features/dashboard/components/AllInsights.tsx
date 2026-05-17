'use client'

import { Card } from '@/components/ui/card'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface AIInsightsProps {
  expenses: Expense[]
}

export default function AIInsights({ expenses }: AIInsightsProps) {
  const generateInsights = () => {
    const categoryTotals = expenses.reduce((acc: Record<string, number>, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount
      return acc
    }, {})

    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const avgDaily = Math.round(totalExpenses / 8)
    const foodExpenses = expenses.filter(e => e.category === 'Food').reduce((sum, e) => sum + e.amount, 0)

    return {
      topCategory: topCategory[0],
      topAmount: topCategory[1] as number,
      avgDaily,
      foodPercent: Math.round((foodExpenses / totalExpenses) * 100),
    }
  }

  const insights = generateInsights()

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-500/15 to-indigo-600/5 border border-indigo-500/30 backdrop-blur-xl p-6 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🎯</div>
          <div className="flex-1">
            <h4 className="font-bold text-indigo-300 mb-2">Top Spending</h4>
            <p className="text-sm text-slate-300">
              Your biggest expense is <span className="font-bold text-indigo-300">{insights.topCategory}</span> at <span className="font-bold text-indigo-400">₹{insights.topAmount.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-500/15 to-cyan-600/5 border border-cyan-500/30 backdrop-blur-xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all">
        <div className="flex items-start gap-4">
          <div className="text-3xl">📈</div>
          <div className="flex-1">
            <h4 className="font-bold text-cyan-300 mb-2">Daily Average</h4>
            <p className="text-sm text-slate-300">
              You&apos;re spending <span className="font-bold text-cyan-400">₹{insights.avgDaily}</span> per day on average
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/15 to-purple-600/5 border border-purple-500/30 backdrop-blur-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🍕</div>
          <div className="flex-1">
            <h4 className="font-bold text-purple-300 mb-2">Food Analysis</h4>
            <p className="text-sm text-slate-300">
              Food accounts for <span className="font-bold text-purple-400">{insights.foodPercent}%</span> of your total spending
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/30 backdrop-blur-xl p-6 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div className="flex-1">
            <h4 className="font-bold text-amber-300 mb-2">Smart Tip</h4>
            <p className="text-sm text-slate-300">
              Review your recurring subscriptions and cancel unused ones to save money
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
