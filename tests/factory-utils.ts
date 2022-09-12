import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { NewPool, OwnershipTransferred } from "../generated/Factory/Factory"

export function createNewPoolEvent(
  tokenX: Address,
  tokenY: Address,
  fee: i32,
  pointDelta: i32,
  pool: Address
): NewPool {
  let newPoolEvent = changetype<NewPool>(newMockEvent())

  newPoolEvent.parameters = new Array()

  newPoolEvent.parameters.push(
    new ethereum.EventParam("tokenX", ethereum.Value.fromAddress(tokenX))
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam("tokenY", ethereum.Value.fromAddress(tokenY))
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "fee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee))
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam(
      "pointDelta",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(pointDelta))
    )
  )
  newPoolEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return newPoolEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
