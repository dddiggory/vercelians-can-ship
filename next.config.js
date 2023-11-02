/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.githubusercontent.com',
              },
        ]
    }
}

module.exports = nextConfig
