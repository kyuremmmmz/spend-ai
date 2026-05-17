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

const COLORS = ['#4ade80', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6']

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
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
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
          <Tooltip formatter={(value) => `₹${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
