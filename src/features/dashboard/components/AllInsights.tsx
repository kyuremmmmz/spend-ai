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

    const topCategory = Object.entries(categoryTotals).sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0]
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
      <Card className="bg-linear-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-400/30 backdrop-blur-xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div className="flex-1">
            <h4 className="font-semibold text-emerald-300 mb-1">AI Insight</h4>
            <p className="text-sm text-slate-300">
              Your top spending category is <span className="font-semibold text-emerald-400">{insights.topCategory}</span> with ₹{insights.topAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-400/30 backdrop-blur-xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">📊</div>
          <div className="flex-1">
            <h4 className="font-semibold text-cyan-300 mb-1">Daily Average</h4>
            <p className="text-sm text-slate-300">
              You&apos;re averaging <span className="font-semibold text-cyan-400">₹{insights.avgDaily}</span> per day
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-linear-to-br from-purple-500/20 to-purple-600/10 border-purple-400/30 backdrop-blur-xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🍔</div>
          <div className="flex-1">
            <h4 className="font-semibold text-purple-300 mb-1">Food Alert</h4>
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-purple-400">{insights.foodPercent}%</span> of your spending is on food
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-linear-to-br from-amber-500/20 to-amber-600/10 border-amber-400/30 backdrop-blur-xl p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="flex-1">
            <h4 className="font-semibold text-amber-300 mb-1">Pro Tip</h4>
            <p className="text-sm text-slate-300">
              Track recurring expenses to identify potential savings opportunities
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
