/* eslint-disable prefer-const */
import { Pair, Token } from "../generated/schema";
import { Pair as PairTemplate } from "../generated/templates";
import { NewPool as PairCreated } from "../generated/Factory/Factory";
import {
  ZERO_BD,
  fetchTokenSymbol,
  fetchTokenName,
  fetchTokenDecimals,
} from "./utils";

export function handlePairCreated(event: PairCreated): void {
  let token0 = Token.load(event.params.tokenX.toHex());
  if (token0 === null) {
    token0 = new Token(event.params.tokenX.toHex());
    token0.name = fetchTokenName(event.params.tokenX);
    token0.symbol = fetchTokenSymbol(event.params.tokenX);
    let decimals = fetchTokenDecimals(event.params.tokenX);
    if (decimals === null) {
      return;
    }
    token0.decimals = decimals;
    token0.save();
  }

  let token1 = Token.load(event.params.tokenY.toHex());
  if (token1 === null) {
    token1 = new Token(event.params.tokenY.toHex());
    token1.name = fetchTokenName(event.params.tokenY);
    token1.symbol = fetchTokenSymbol(event.params.tokenY);
    let decimals = fetchTokenDecimals(event.params.tokenY);
    if (decimals === null) {
      return;
    }
    token1.decimals = decimals;
    token1.save();
  }

  let pair = new Pair(event.params.pool.toHex()) as Pair;
  pair.token0 = token0.id;
  pair.token1 = token1.id;
  pair.reserve0 = ZERO_BD;
  pair.reserve1 = ZERO_BD;
  pair.token0Price = ZERO_BD;
  pair.token1Price = ZERO_BD;
  pair.createdAtBlockNumber = event.block.number;
  pair.createdAtTimestamp = event.block.timestamp;
  pair.save();

  PairTemplate.create(event.params.pool);
}