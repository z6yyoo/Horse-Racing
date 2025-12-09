'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HORSES } from '@/lib/horses'
import { Trophy } from 'lucide-react'

interface RaceTrackProps {
    isRacing: boolean
    winnerId: number | null
    duration: number
}

export default function RaceTrack({ isRacing, winnerId, duration }: RaceTrackProps) {
    const [positions, setPositions] = useState<number[]>(Array(10).fill(0))

    useEffect(() => {
        if (!isRacing) {
            setPositions(Array(10).fill(0))
            return
        }

        // Animate horses
        const interval = setInterval(() => {
            setPositions(prev => prev.map(() => Math.random() * 100))
        }, 100)

        return () => clearInterval(interval)
    }, [isRacing])

    return (
        <div className="relative w-full h-[500px] bg-gradient-to-b from-sky-400 to-sky-300 rounded-xl overflow-hidden border-4 border-gray-800">
            {/* Background Track */}
            <div className="absolute inset-0">
                <Image
                    src="/images/track.png"
                    alt="Race Track"
                    fill
                    className="object-cover pixelated"
                />
            </div>

            {/* Crowd */}
            <div className="absolute top-0 left-0 right-0 h-20">
                <Image
                    src="/images/crowd.png"
                    alt="Crowd"
                    fill
                    className="object-cover pixelated"
                />
            </div>

            {/* Race Lanes */}
            <div className="absolute top-24 left-0 right-0 bottom-0 flex flex-col justify-around px-8">
                {HORSES.map((horse, index) => (
                    <div key={horse.id} className="relative h-12 border-b border-white/20">
                        {/* Lane Number */}
                        <div className="absolute left-0 top-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-xs font-bold">
                            {horse.id}
                        </div>

                        {/* Horse */}
                        <motion.div
                            className="absolute top-0 h-12 w-12"
                            animate={{
                                left: isRacing ? `${positions[index]}%` : '0%'
                            }}
                            transition={{
                                duration: duration / 1000,
                                ease: 'easeOut'
                            }}
                        >
                            <Image
                                src={horse.imageUrl}
                                alt={horse.name}
                                width={48}
                                height={48}
                                className="pixelated"
                            />

                            {winnerId === horse.id && (
                                <div className="absolute -top-2 -right-2">
                                    <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />
                                </div>
                            )}
                        </motion.div>

                        {/* Finish Line */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50" />
                    </div>
                ))}
            </div>

            {/* Race Status */}
            {isRacing && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 px-8 py-4 rounded-xl">
                    <p className="text-3xl font-bold text-yellow-400 animate-pulse">
                        RACING...
                    </p>
                </div>
            )}

            {winnerId && !isRacing && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 px-12 py-8 rounded-xl border-4 border-yellow-400 animate-bounce">
                    <p className="text-4xl font-bold text-yellow-400 mb-2">
                        🏆 WINNER! 🏆
                    </p>
                    <p className="text-2xl text-white text-center">
                        #{winnerId} {HORSES[winnerId - 1].name}
                    </p>
                </div>
            )}
        </div>
    )
}
