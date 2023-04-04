import { ethers, Signer, Wallet } from 'ethers'

const DEPLOYER_KEY = process.env.DEPLOYER_KEY
if (!DEPLOYER_KEY) throw new Error('DEPLOYER_KEY not set.')

const defaultOwner = new Wallet(process.env.DEPLOYER_KEY as string)

export function CreateMessage(to: string, score: number, owner: string = defaultOwner.address) {
  return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address', 'uint16', 'address'], [to, score, owner]))
}

export function SignMessage(message: string, signer: Signer = defaultOwner) {
  return signer.signMessage(ethers.utils.arrayify(message))
}

export async function CreateAndSignMessage(to: string, score: number, signer: Signer = defaultOwner) {
  const message = CreateMessage(to, score, await signer.getAddress())
  return SignMessage(message, signer)
}
