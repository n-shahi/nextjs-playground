/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*', // all endpoint of app
                headers: [
                    { key: 'referrer-policy', value: 'no-referrer' },
                ],
            },
        ]
    }
}

module.exports = nextConfig
