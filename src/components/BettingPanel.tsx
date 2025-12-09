'use client'

import { useState } from 'react'
import { Minus, Plus, Play } from 'lucide-react'

interface BettingPanelProps {
    selectedHorse: number | null
    points: number
    pool: number
    onBet: (amount: number) => void
    onStartRace: () => void
    disabled: boolean
}

export default function BettingPanel({
    selectedHorse,
    points,
    pool,
    onBet,
    onStartRace,
    disabled
}: BettingPanelProps) {
    const [betAmount, setBetAmount] = useState(100)

    const quickAmounts = [100, 500, 1000, 5000]

    const handleBet = () => {
        if (betAmount > points) {
            alert('Not enough points!')
            return
        }
        if (!selectedHorse) {
            alert('Please select a horse!')
            return
        }
        onBet(betAmount)
    }

    return (
        <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-yellow-400">Place Your Bet</h3>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Prize Pool</p>
                    <p className="text-lg font-bold text-green-400">{pool.toLocaleString()}</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-gray-400">Bet Amount</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setBetAmount(Math.max(100, betAmount - 100))}
                        disabled={disabled}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <Minus className="w-4 h-4" />
                    </button>

                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        disabled={disabled}
                        className="flex-1 px-4 py-2 bg-gray-800 rounded text-center font-mono text-lg"
                        min={100}
                        max={points}
                    />

                    <button
                        onClick={() => setBetAmount(Math.min(points, betAmount + 100))}
                        disabled={disabled}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex gap-2">
                    {quickAmounts.map(amount => (
                        <button
                            key={amount}
                            onClick={() => setBetAmount(amount)}
                            disabled={disabled || amount > points}
                            className="flex-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm disabled:opacity-50"
                        >
                            {amount}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleBet}
                    disabled={disabled || !selectedHorse || betAmount > points}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Place Bet
                </button>

                <button
                    onClick={onStartRace}
                    disabled={disabled || pool === 0}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Play className="w-5 h-5" />
                    Start Race
                </button>
            </div>

            {!selectedHorse && (
                <p className="text-sm text-yellow-400 text-center">
                    ⚠️ Select a horse first
                </p>
            )}
        </div>
    )
}
