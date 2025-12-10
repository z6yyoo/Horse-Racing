/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, must-revalidate',
                    },
                ],
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bmadv6.vercel.app',
            },
            {
                protocol: 'https',
                hostname: 'horseracing666.vercel.app',
            },
        ],
    },
    turbopack: {},
    webpack: (config, { isServer }) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
            crypto: false,
        }

        config.externals.push(
            'pino-pretty',
            'lokijs',
            'encoding',
            '@base-org/account',
            '@gemini-wallet/core',
            '@metamask/sdk',
            'porto',
            '@safe-global/safe-apps-sdk',
            '@safe-global/safe-apps-provider',
            'thread-stream',
            'pino'
        )

        // Ignore test files
        config.module = {
            ...config.module,
            exprContextCritical: false,
        }

        return config
    },
}

module.exports = nextConfig
