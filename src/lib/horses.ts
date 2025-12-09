import { Horse } from '@/types'

export const HORSES: Horse[] = [
    {
        id: 1,
        name: "Thunder Bolt",
        color: "Brown",
        odds: "3:1",
        wins: 45,
        races: 120,
        specialSkill: "Lightning Speed",
        funFact: "Can run faster in rainy weather",
        imageUrl: "/images/horse-1.png"
    },
    {
        id: 2,
        name: "Midnight Shadow",
        color: "Black",
        odds: "4:1",
        wins: 38,
        races: 115,
        specialSkill: "Night Vision",
        funFact: "Never loses after sunset",
        imageUrl: "/images/horse-2.png"
    },
    {
        id: 3,
        name: "Snow Storm",
        color: "White",
        odds: "5:1",
        wins: 32,
        races: 110,
        specialSkill: "Cold Resistance",
        funFact: "Loves eating carrots",
        imageUrl: "/images/horse-3.png"
    },
    {
        id: 4,
        name: "Chocolate Dream",
        color: "Dark Brown",
        odds: "6:1",
        wins: 28,
        races: 105,
        specialSkill: "Sweet Stamina",
        funFact: "Gets energy from chocolate",
        imageUrl: "/images/horse-4.png"
    },
    {
        id: 5,
        name: "Silver Streak",
        color: "Gray",
        odds: "7:1",
        wins: 25,
        races: 100,
        specialSkill: "Mirror Shine",
        funFact: "Distracts opponents with shiny coat",
        imageUrl: "/images/horse-5.png"
    },
    {
        id: 6,
        name: "Crimson Fire",
        color: "Chestnut",
        odds: "8:1",
        wins: 22,
        races: 98,
        specialSkill: "Flame Dash",
        funFact: "Leaves fire trails when running",
        imageUrl: "/images/horse-6.png"
    },
    {
        id: 7,
        name: "Golden Arrow",
        color: "Palomino",
        odds: "9:1",
        wins: 20,
        races: 95,
        specialSkill: "Precision Gallop",
        funFact: "Never misses the finish line",
        imageUrl: "/images/horse-7.png"
    },
    {
        id: 8,
        name: "Emerald Dash",
        color: "Bay",
        odds: "10:1",
        wins: 18,
        races: 92,
        specialSkill: "Lucky Clover",
        funFact: "Born on St. Patrick's Day",
        imageUrl: "/images/horse-8.png"
    },
    {
        id: 9,
        name: "Twilight Runner",
        color: "Roan",
        odds: "12:1",
        wins: 15,
        races: 90,
        specialSkill: "Dusk Power",
        funFact: "Fastest during golden hour",
        imageUrl: "/images/horse-9.png"
    },
    {
        id: 10,
        name: "Rainbow Dash",
        color: "Paint",
        odds: "15:1",
        wins: 12,
        races: 88,
        specialSkill: "Color Magic",
        funFact: "Changes color after every win",
        imageUrl: "/images/horse-10.png"
    }
]

// Generate random stats for scrolling text
export function generateRandomStats(horseId: number): string {
    const stats = [
        `${HORSES[horseId - 1].name} has won ${HORSES[horseId - 1].wins} out of ${HORSES[horseId - 1].races} races`,
        `Special Skill: ${HORSES[horseId - 1].specialSkill}`,
        `Fun Fact: ${HORSES[horseId - 1].funFact}`,
        `Current Odds: ${HORSES[horseId - 1].odds}`,
        `Win Rate: ${((HORSES[horseId - 1].wins / HORSES[horseId - 1].races) * 100).toFixed(1)}%`,
        `Color: ${HORSES[horseId - 1].color}`,
        `Favorite Track: Dirt Course`,
        `Best Time: ${(8 + Math.random() * 2).toFixed(2)} seconds`,
        `Top Speed: ${(55 + Math.random() * 15).toFixed(1)} mph`,
        `Jockey: Rider #${horseId}`,
    ]

    return stats.join(' • ')
}
