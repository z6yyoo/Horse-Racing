import type { Metadata } from "next"
import { Press_Start_2P } from 'next/font/google'
import { Providers } from "./providers"
import "./globals.css"

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

const DOMAIN = 'https://bmadv6.vercel.app' // Change to your domain

export const metadata: Metadata = {
  title: "BMAD v6 - Horse Racing Game",
  description: "Retro arcade horse racing game on Base network. Bet, race, and climb the leaderboard!",
  openGraph: {
    title: "BMAD v6 - Horse Racing Game",
    description: "Retro arcade horse racing game. Bet, race, and win!",
    images: [{
      url: `${DOMAIN}/splash.png`,
      width: 1200,
      height: 630,
      alt: "BMAD Horse Racing",
    }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: `${DOMAIN}/splash.png`,
      button: {
        title: "🏇 Start Racing",
        action: {
          type: "launch_miniapp",
          url: DOMAIN
        }
      }
    }),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
