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
      height: 800,
      alt: "Horse Racing Game",
    }],
  },
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: `${DOMAIN}/splash.png`,
      button: {
        title: "Play Now",
        action: {
          type: "launch_miniapp",
          url: DOMAIN
        }
      }
    }),
    "fc:frame": JSON.stringify({
      version: "1",
      imageUrl: `${DOMAIN}/splash.png`,
      button: {
        title: "Play Now",
        action: {
          type: "launch_frame",
          name: "Horse Racing",
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
