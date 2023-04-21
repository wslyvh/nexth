import { Passport, Transfer } from '../generated/Passport/Passport'
import { Token } from '../generated/schema'

export function handleTransfer(event: Transfer): void {
  let entity = new Token(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.tokenId = event.params.tokenId
  entity.owner = event.params.to
  entity.transactionHash = event.transaction.hash

  let contract = Passport.bind(event.address)
  entity.score = contract.scores(event.params.tokenId)

  entity.save()
}
