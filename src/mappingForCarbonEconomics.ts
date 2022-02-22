import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Initialized,
  OwnershipTransferred,
  ControllerSet,
} from '../generated/CarbonEconomics/CarbonEconomics';

import { loadOrCreateCarbonEconomics } from './helpers/loadOrCreateCarbonEconomics';

export function handleInitialized(event: Initialized): void {
  const _CarbonEconomics = loadOrCreateCarbonEconomics(event.address);
  // _CarbonEconomics.owner = event.params.newOwner;
  _CarbonEconomics.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _CarbonEconomics = loadOrCreateCarbonEconomics(event.address);
  _CarbonEconomics.owner = event.params.newOwner;
  _CarbonEconomics.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const _CarbonEconomics = loadOrCreateCarbonEconomics(event.address);
  if (event.params.controllerId == 'carbonopus') {
    _CarbonEconomics.carbonOpus = event.params.controller.toHex();
  }
  if (event.params.controllerId == 'settings') {
    _CarbonEconomics.carbonSettings = event.params.controller.toHex();
  }
  _CarbonEconomics.save();
}
