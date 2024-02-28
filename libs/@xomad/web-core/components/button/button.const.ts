import { XomadCoreButtonConfig } from './button.type';

export const defaultConfigLoader: XomadCoreButtonConfig = {
  shadow: false,
  borderRadius: true,
  opacity: 1,
};

export const CLASSES_MAP_PAIR: Array<{ selector: string, classes: string[] }> = [
  {
    selector: 'xo-raised-button',
    classes: ['xo-raised-button'],
  },
  {
    selector: 'xo-fab-icon',
    classes: ['xo-fab-icon'],
  },
  {
    selector: 'xo-outlined-button',
    classes: ['xo-outlined-button'],
  },
  {
    selector: 'xo-icon-button',
    classes: ['xo-icon-button'],
  },
];
