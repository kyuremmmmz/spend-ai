'use client'

import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface CategoryBreakdownProps {
  expenses: Expense[]
}

const COLORS = ['#6366f1', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6']

export default function CategoryBreakdown({ expenses }: CategoryBreakdownProps) {
  const categoryData = expenses.reduce((acc: { name: string; value: number }[], exp) => {
    const existing = acc.find(c => c.name === exp.category)
    if (existing) {
      existing.value += exp.amount
    } else {
      acc.push({ name: exp.category, value: exp.amount })
    }
    return acc
  }, [])

  return (
    <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl p-8 hover:border-indigo-500/40 transition-all">
      <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Spending by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ₹${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `₹${value}`}
            contentStyle={{ backgroundColor: 'rgba(15, 23, 41, 0.95)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px' }}
            labelStyle={{ color: 'rgb(248, 250, 252)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
