/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")

/* if (!fs.existsSync("./.env")) {
    // eslint-disable-next-line global-require
    require("dotenv").config({ path: "../../.env" })
} */

const nextConfig = withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development"
})({
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: true,
    swcMinify: true,
    env: {
        ETHEREUM_URL: process.env.ETHEREUM_URL,
        ETHEREUM_PRIVATE_KEY: process.env.ETHEREUM_PRIVATE_KEY,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS
    },
    publicRuntimeConfig: {
        GROUP_ID: process.env.GROUP_ID
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false
            }
        }

        return config
    }
})

module.exports = nextConfig