'use client'

import Image from 'next/image'
import { Horse } from '@/types'
import { Trophy } from 'lucide-react'

interface HorseCardProps {
    horse: Horse
    selected: boolean
    onSelect: () => void
    disabled?: boolean
}

export default function HorseCard({
    horse,
    selected,
    onSelect,
    disabled = false
}: HorseCardProps) {
    return (
        <button
            onClick={onSelect}
            disabled={disabled}
            className={`
        relative p-4 rounded-xl border-2 transition-all
        ${selected
                    ? 'border-yellow-400 bg-yellow-900/30 scale-105'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
      `}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="relative w-24 h-24">
                    <Image
                        src={horse.imageUrl}
                        alt={horse.name}
                        fill
                        className="object-contain pixelated"
                    />
                    {selected && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                            <Trophy className="w-4 h-4 text-black" />
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <p className="font-bold text-sm">{horse.name}</p>
                    <p className="text-xs text-gray-400">#{horse.id} • {horse.color}</p>
                    <p className="text-xs text-yellow-400 mt-1">Odds: {horse.odds}</p>
                </div>

                <div className="text-xs text-gray-500">
                    <p>{horse.wins}W / {horse.races}R</p>
                </div>
            </div>
        </button>
    )
}
