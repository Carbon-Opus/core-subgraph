import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  CarbonEconomics,
} from '../../generated/schema';

import {
  CarbonEconomics as CarbonEconomicsContract,
} from '../../generated/CarbonEconomics/CarbonEconomics';


export function loadOrCreateCarbonEconomics(
  carbonEconomicsAddress: Address
): CarbonEconomics {
  const id = carbonEconomicsAddress.toHex();
  let _carbonEconomics = CarbonEconomics.load(id);

  if (!_carbonEconomics) {
    _carbonEconomics = new CarbonEconomics(id);
    const boundCarbonEconomics = CarbonEconomicsContract.bind(carbonEconomicsAddress);

    _carbonEconomics.owner = boundCarbonEconomics.owner();
    _carbonEconomics.save();
  }

  return _carbonEconomics as CarbonEconomics;
}
