import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  CarbonOpus,
} from '../../generated/schema';

import {
  CarbonOpus as CarbonOpusContract,
} from '../../generated/CarbonOpus/CarbonOpus';


export function loadOrCreateCarbonOpus(
  CarbonOpusAddress: Address
): CarbonOpus {
  const id = CarbonOpusAddress.toHex();
  let _CarbonOpus = CarbonOpus.load(id);

  if (!_CarbonOpus) {
    _CarbonOpus = new CarbonOpus(id);
    const boundCarbonOpus = CarbonOpusContract.bind(CarbonOpusAddress);

    _CarbonOpus.owner = boundCarbonOpus.owner();
    _CarbonOpus.save();
  }

  return _CarbonOpus as CarbonOpus;
}
