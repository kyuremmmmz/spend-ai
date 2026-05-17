'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  type: 'user' | 'ai'
  text: string
  timestamp: Date
}

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

interface AIChatBotProps {
  expenses: Expense[]
}

export default function AIChatBot({ expenses }: AIChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Hi! I\'m your financial AI assistant. Ask me about your spending, budgeting tips, or get personalized financial advice based on your expenses.',
      timestamp: new Date(),
    },
  ])

  const [inputText, setInputText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const avgSpend = Math.round(totalSpend / expenses.length)

    // Category analysis
    const categorySpend: Record<string, number> = {}
    expenses.forEach((exp) => {
      categorySpend[exp.category] = (categorySpend[exp.category] || 0) + exp.amount
    })

    const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0]

    const responses: Record<string, string> = {
      spending: `Your total spending is ₹${totalSpend.toLocaleString()} across ${expenses.length} transactions. Your average expense is ₹${avgSpend.toLocaleString()}. Your biggest spending category is ${topCategory?.[0] || 'unknown'} with ₹${Math.round(topCategory?.[1] || 0).toLocaleString()}.`,

      budget: `Based on your current spending pattern of ₹${totalSpend.toLocaleString()}, I'd recommend setting a monthly budget of ₹${Math.round(totalSpend * 0.8).toLocaleString()} to leave room for savings. Try to reduce expenses in ${topCategory?.[0] || 'your top category'}.`,

      save: `Here are my top savings tips: 1) Your ${topCategory?.[0]} spending is your biggest expense - try to cut it by 20%. 2) Set up automatic transfers to savings. 3) Track your daily expenses to stay aware. 4) Look for subscription services you don't use.`,

      category: topCategory ? `Your top spending category is ${topCategory[0]} with ₹${Math.round(topCategory[1]).toLocaleString()}. This accounts for ${Math.round((topCategory[1] / totalSpend) * 100)}% of your total spending.` : 'No spending data available.',

      advice: `Here's my financial advice: Keep your expenses under control by reviewing them weekly. Focus on reducing non-essential spending. Build an emergency fund with 3-6 months of expenses. And remember, small savings today lead to big results tomorrow!`,

      hello: `Hello! I'm here to help you manage your finances better. You can ask me about your spending, budgeting tips, savings strategies, or analysis of your expenses.`,

      help: `I can help you with: 1) Analyze your spending by category 2) Suggest budgets 3) Provide savings tips 4) Answer financial questions 5) Track spending trends`,
    }

    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
      if (
        lowerQuery.includes(key) ||
        lowerQuery.includes(key.slice(0, 4))
      ) {
        return response
      }
    }

    // Default response
    return `That's an interesting question! Based on your current expenses, I'd say focus on tracking your ${topCategory?.[0] || 'spending'} more carefully and look for areas to cut back. Feel free to ask me about your budget, savings tips, or spending analysis!`
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Math.random().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(),
        type: 'ai',
        text: getAIResponse(inputText),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 500)

    setInputText('')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-110 transition-all z-40"
        title="Open AI Chat"
      >
        <span className="text-3xl">💬</span>
      </button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 max-h-96 bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-indigo-500/30 backdrop-blur-xl p-5 shadow-2xl shadow-indigo-500/20 flex flex-col z-50">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center text-sm">🤖</div>
          <h3 className="font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">FinanceAI</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg p-1 transition-all"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-indigo-500/40 to-indigo-600/30 text-slate-100 border border-indigo-400/40'
                  : 'bg-slate-700/60 text-slate-100 border border-slate-600/40'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask about spending..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="bg-slate-700/50 border border-indigo-500/30 text-slate-50 placeholder-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20 text-sm"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white px-3 shadow-lg shadow-indigo-500/20"
          size="sm"
        >
          Send
        </Button>
      </div>
    </Card>
  )
}
