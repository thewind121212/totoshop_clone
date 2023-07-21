/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'pos.nvncdn.net',
            }
        ]
    }
}

module.exports = nextConfig
