'use client'

import { useState } from 'react'
import Logo from '@/components/Logo'
import ConnectWallet from '@/components/ConnectWallet'
import PointsDisplay from '@/components/PointsDisplay'
import HorseCard from '@/components/HorseCard'
import BettingPanel from '@/components/BettingPanel'
import RaceTrack from '@/components/RaceTrack'
import ScrollingStats from '@/components/ScrollingStats'
import Leaderboard from '@/components/Leaderboard'
import { usePoints } from '@/hooks/usePoints'
import { useRace } from '@/hooks/useRace'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import { HORSES } from '@/lib/horses'

export default function Home() {
  const { points, addPoints, deductPoints } = usePoints()
  const { isRacing, result, pool, placeBet, startRace, resetRace } = useRace()
  const { updateLeaderboard } = useLeaderboard()
  const [selectedHorse, setSelectedHorse] = useState<number | null>(null)
  const [myBet, setMyBet] = useState<{ horseId: number; amount: number } | null>(null)

  const handleBet = (amount: number) => {
    if (!selectedHorse || amount > points) return

    deductPoints(amount)
    placeBet(selectedHorse, amount)
    setMyBet({ horseId: selectedHorse, amount })
  }

  const handleStartRace = async () => {
    const raceResult = await startRace()

    if (raceResult && myBet && raceResult.winnerId === myBet.horseId) {
      // Winner! simplified: win the whole pool
      const winnings = pool
      addPoints(winnings)
      updateLeaderboard(points + winnings, 1)
      alert(`🎉 You won ${winnings.toLocaleString()} points!`)
    } else {
      alert('Better luck next time!')
    }

    // Reset for new round
    setTimeout(() => {
      resetRace()
      setMyBet(null)
      setSelectedHorse(null)
    }, 5000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <PointsDisplay points={points} addPoints={addPoints} />
          <ConnectWallet />
        </div>
      </header>

      {/* Scrolling Stats */}
      <ScrollingStats horseId={selectedHorse || 1} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Horse Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Select Your Horse
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {HORSES.map(horse => (
                <HorseCard
                  key={horse.id}
                  horse={horse}
                  selected={selectedHorse === horse.id}
                  onSelect={() => setSelectedHorse(horse.id)}
                  disabled={isRacing || myBet !== null}
                />
              ))}
            </div>
          </div>

          {/* Race Track */}
          <RaceTrack
            isRacing={isRacing}
            winnerId={result?.winnerId || null}
            duration={result?.duration || 10000}
          />

          {/* Betting Panel */}
          <BettingPanel
            selectedHorse={selectedHorse}
            points={points}
            pool={pool}
            onBet={handleBet}
            onStartRace={handleStartRace}
            disabled={isRacing}
          />
        </div>

        {/* Right: Leaderboard */}
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm">
        <p>Horse Racing Game on Base Network</p>
        <p className="mt-2">
          🎮 Play for fun • Connect wallet to claim daily bonus and save your score
        </p>
      </footer>
    </main>
  )
}
