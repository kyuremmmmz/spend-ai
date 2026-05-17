'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

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

export default function ExpenseChart({
  expenses,
}: ExpenseChartProps) {
  const chartData = expenses
    .reduce<{ date: string; amount: number }[]>((acc, exp) => {
      const formattedDate = new Date(exp.date).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        }
      )

      const existing = acc.find(
        (d) => d.date === formattedDate
      )

      if (existing) {
        existing.amount += exp.amount
      } else {
        acc.push({
          date: formattedDate,
          amount: exp.amount,
        })
      }

      return acc
    }, [])
    .slice(-7)

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Spending Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.1)"
          />

          <XAxis
            dataKey="date"
            stroke="rgba(148, 163, 184, 0.5)"
          />

          <YAxis
            stroke="rgba(148, 163, 184, 0.5)"
          />

          <Tooltip
            contentStyle={{
              backgroundColor:
                'rgba(30, 41, 59, 0.9)',
              border:
                '1px solid rgba(148, 163, 184, 0.2)',
            }}
            labelStyle={{
              color: 'rgb(226, 232, 240)',
            }}
            formatter={(value) => `₱${value}`}
          />

          <Bar
            dataKey="amount"
            fill="url(#colorGradient)"
          />

          <defs>
            <linearGradient
              id="colorGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#4ade80"
              />
              <stop
                offset="100%"
                stopColor="#06b6d4"
              />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}