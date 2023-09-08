/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'pos.nvncdn.net'
            },
            {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com'
            }
        ]
    }
}

module.exports = nextConfig
