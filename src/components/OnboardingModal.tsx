'use client'

import { useState, useEffect } from 'react'
import { X, Play, Trophy, Coins, TrendingUp } from 'lucide-react'
import Image from 'next/image'

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
    if (!hasSeenOnboarding) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('hasSeenOnboarding', 'true')
    setIsOpen(false)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = [
    {
      title: "Welcome to Horse Racing! 🏇",
      description: "A thrilling retro-style horse racing game on Base network",
      icon: <Trophy className="w-16 h-16 text-yellow-400" />,
      content: (
        <div className="space-y-4 text-left">
          <p>Experience the excitement of horse racing with 10 unique horses!</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Start with 5,000 points</li>
            <li>Bet on your favorite horse</li>
            <li>Win prizes and climb the leaderboard</li>
            <li>Play instantly - no wallet required to start!</li>
          </ul>
        </div>
      )
    },
    {
      title: "How to Play 🎮",
      description: "Simple and fun gameplay",
      icon: <Play className="w-16 h-16 text-blue-400" />,
      content: (
        <div className="space-y-4 text-left">
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-semibold">Select Your Horse</p>
                <p className="text-sm text-gray-400">Choose from 10 unique horses with different odds</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-semibold">Place Your Bet</p>
                <p className="text-sm text-gray-400">Decide how many points to wager</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-semibold">Watch the Race</p>
                <p className="text-sm text-gray-400">See the horses compete in real-time</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-semibold">Win Rewards</p>
                <p className="text-sm text-gray-400">Winners share the prize pool!</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Earn Bonus Points 💰",
      description: "Connect your wallet for extra rewards",
      icon: <Coins className="w-16 h-16 text-green-400" />,
      content: (
        <div className="space-y-4 text-left">
          <p>Connect your wallet to unlock premium features:</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Daily Bonus:</strong> Claim 1,000 free points every day</li>
            <li><strong>Leaderboard:</strong> Save your high scores on-chain</li>
            <li><strong>Profile:</strong> Show your avatar and username</li>
          </ul>
          <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-3 mt-4">
            <p className="text-sm text-blue-300">
              ℹ️ Your wallet is only needed for claiming bonuses and saving scores. You can play anytime without connecting!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Compete & Win 🏆",
      description: "Climb the leaderboard and become a champion",
      icon: <TrendingUp className="w-16 h-16 text-purple-400" />,
      content: (
        <div className="space-y-4 text-left">
          <p>Ready to become a racing champion?</p>
          <div className="space-y-2 text-sm">
            <p>📊 <strong>View Statistics:</strong> See each horse's win rate and odds</p>
            <p>🎯 <strong>Strategy Matters:</strong> Higher odds = bigger rewards (but harder to win!)</p>
            <p>🏅 <strong>Top Rankings:</strong> Compete with players worldwide</p>
            <p>⚡ <strong>Fast & Fair:</strong> Blockchain-based random results</p>
          </div>
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-3 mt-4">
            <p className="text-sm text-green-300">
              Ready to start? Click "Let's Race!" to begin your journey!
            </p>
          </div>
        </div>
      )
    }
  ]

  if (!isOpen) return null

  const step = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-500 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex justify-center mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-yellow-400 text-center">{step.title}</h2>
            <p className="text-gray-400 text-center mt-2">{step.description}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step.content}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-yellow-400 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <span className="text-sm text-gray-400 self-center">
            {currentStep + 1} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 rounded-lg font-bold transition-colors"
          >
            {currentStep === steps.length - 1 ? "Let's Race!" : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
