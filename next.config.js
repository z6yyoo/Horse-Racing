/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bmadv6.vercel.app',
            },
        ],
    },
    turbopack: {},
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        config.externals.push(
            'pino-pretty',
            'lokijs',
            'encoding',
            '@base-org/account',
            '@gemini-wallet/core',
            '@metamask/sdk',
            'porto',
            '@safe-global/safe-apps-sdk',
            '@safe-global/safe-apps-provider'
        )
        return config
    },
}

module.exports = nextConfig
