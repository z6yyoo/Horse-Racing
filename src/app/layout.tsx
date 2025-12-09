import type { Metadata } from "next"
import { Press_Start_2P } from 'next/font/google'
import { Providers } from "./providers"
import "./globals.css"

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
})

const DOMAIN = 'https://horseracing666.vercel.app'

export const metadata: Metadata = {
  title: "Horse Racing - Retro Arcade Game",
  description: "Bet on 10 unique horses, watch thrilling races, and climb the leaderboard! Play instantly on Base network.",
  openGraph: {
    title: "Horse Racing - Retro Arcade Game",
    description: "Bet on 10 unique horses and win big! Retro pixel art racing game.",
    images: [{
      url: `${DOMAIN}/splash.png`,
      width: 1200,
      height: 630,
      alt: "Horse Racing Game",
    }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${DOMAIN}/splash.png`,
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "🏇 Start Racing",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": DOMAIN,
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
