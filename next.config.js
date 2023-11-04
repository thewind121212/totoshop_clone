const { prototype } = require('events')

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
            },
            {
            protocol: 'http',
            hostname: "192.168.0.253",
            port: "8080"
            }
        ],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },
}

module.exports = nextConfig
