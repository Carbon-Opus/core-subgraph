import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Initialized,
  OwnershipTransferred,
  ControllerSet,
} from '../generated/CarbonOpus/CarbonOpus';

import { loadOrCreateCarbonOpus } from './helpers/loadOrCreateCarbonOpus';

export function handleInitialized(event: Initialized): void {
  const _CarbonOpus = loadOrCreateCarbonOpus(event.address);
  // _CarbonOpus.owner = event.params.newOwner;
  _CarbonOpus.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _CarbonOpus = loadOrCreateCarbonOpus(event.address);
  _CarbonOpus.owner = event.params.newOwner;
  _CarbonOpus.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const _CarbonOpus = loadOrCreateCarbonOpus(event.address);
  if (event.params.controllerId == 'settings') {
    _CarbonOpus.carbonSettings = event.params.controller.toHex();
  }
  if (event.params.controllerId == 'economics') {
    _CarbonOpus.carbonEconomics = event.params.controller.toHex();
  }
  _CarbonOpus.save();
}
