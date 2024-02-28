import { InjectionToken } from '@angular/core';
import { defaultConfigLoader } from './button.const';
import { XomadCoreButtonConfig } from './button.type';

export const XO_BUTTON_CONFIG = new InjectionToken<XomadCoreButtonConfig>('XO_BUTTON_CONFIG', {
  factory: () => defaultConfigLoader,
});
