export function truncateAddress(address: string) {
  if (!address) return ''
  return `${address.slice(0, 9)}...${address.slice(-9)}`
}
