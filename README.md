# Nexth

A Next.js + Ethereum starter kit with Viem, Wagmi, Web3Modal, SIWE, Tailwind, daisyUI and more to quickly ship production-ready Web3 Apps ⚡

![Nexth Readme Image](https://nexth.vercel.app/opengraph-image)

## Packages 📦

- [App](./packages/app) - Next.js 14, with App router
- [Hardhat](./packages/hardhat/) - Hardhat projects
- [Foundry](./packages/foundry/) - Foundry projects

Choose the framework to use, "hardhat" or "foundry", eliminating the one we will not use.

1- Delete the folder of the framework that will not be used:
./packages/hardhat/ or ./packages/foundry/

2- Go to "packages/app/wagmi.config.ts" and remove the plugin that will not be used.

```ts
hardhat({
    project: '../hardhat',
    deployments: {
    Message: {
        11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
    },
    },
}),
foundry({
    project: '../foundry',
    deployments: {
    Message: {
        11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
    },
    },
}),
```

## Development 🛠️

```bash
npm run dev
# or
yarn dev
```

## Deploy on Vercel 🚢

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwslyvh%2Fnexth)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=nexth&filter=next.js&utm_source=nexth&utm_campaign=nexth-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
