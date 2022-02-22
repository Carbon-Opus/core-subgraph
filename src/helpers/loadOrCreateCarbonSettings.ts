import { Address, BigInt, log } from '@graphprotocol/graph-ts';

import {
  CarbonSettings,
} from '../../generated/schema';

import {
  CarbonSettings as CarbonSettingsContract,
} from '../../generated/CarbonSettings/CarbonSettings';


export function loadOrCreateCarbonSettings(
  carbonSettingsAddress: Address
): CarbonSettings {
  const id = carbonSettingsAddress.toHex();
  let _carbonSettings = CarbonSettings.load(id);

  if (!_carbonSettings) {
    _carbonSettings = new CarbonSettings(id);
    const barbonargedSettings = CarbonSettingsContract.bind(carbonSettingsAddress);

    _carbonSettings.owner = barbonargedSettings.owner();
    _carbonSettings.save();
  }

  return _carbonSettings as CarbonSettings;
}
