'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface ExpenseChartProps {
  expenses: Expense[]
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Group expenses by day
  const chartData = expenses
    .reduce((acc: { date: string; amount: number }[], exp) => {
      const existing = acc.find(d => d.date === exp.date)
      if (existing) {
        existing.amount += exp.amount
      } else {
        acc.push({ date: new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), amount: exp.amount })
      }
      return acc
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)

  return (
    <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl p-8 hover:border-indigo-500/40 transition-all">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" />
          <XAxis dataKey="date" stroke="rgba(148, 163, 184, 0.6)" style={{ fontSize: '12px' }} />
          <YAxis stroke="rgba(148, 163, 184, 0.6)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(15, 23, 41, 0.95)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px' }}
            labelStyle={{ color: 'rgb(248, 250, 252)' }}
            formatter={(value) => `₹${value}`}
          />
          <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
