import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  Initialized,
  OwnershipTransferred,
  ControllerSet,
} from '../generated/CarbonSettings/CarbonSettings';

import { loadOrCreateCarbonSettings } from './helpers/loadOrCreateCarbonSettings';

export function handleInitialized(event: Initialized): void {
  const _CarbonSettings = loadOrCreateCarbonSettings(event.address);
  // _CarbonSettings.owner = event.params.newOwner;
  _CarbonSettings.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const _CarbonSettings = loadOrCreateCarbonSettings(event.address);
  _CarbonSettings.owner = event.params.newOwner;
  _CarbonSettings.save();
}

export function handleControllerSet(event: ControllerSet): void {
  const _CarbonSettings = loadOrCreateCarbonSettings(event.address);
  if (event.params.controllerId == 'carbonopus') {
    _CarbonSettings.carbonOpus = event.params.controller.toHex();
  }
  _CarbonSettings.save();
}
