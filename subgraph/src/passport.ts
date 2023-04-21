import { Passport, Transfer } from '../generated/Passport/Passport'
import { Global, Token } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'

const globalkey = 'global'

export function handleTransfer(event: Transfer): void {
  let token = new Token(event.transaction.hash.concatI32(event.logIndex.toI32()))

  // Globals
  let global = Global.load(globalkey)
  if (global == null) {
    global = new Global(globalkey)
    global.tokens = BigInt.zero()
  }

  token.index = global.tokens
  token.tokenId = event.params.tokenId
  token.owner = event.params.to
  token.transactionHash = event.transaction.hash

  let contract = Passport.bind(event.address)
  token.score = contract.scores(event.params.tokenId)
  token.save()

  global.tokens = global.tokens.plus(integer.ONE)
  global.save()
}
