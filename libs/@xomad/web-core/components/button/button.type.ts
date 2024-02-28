export interface XomadCoreButtonConfig {
  shadow: boolean;
  borderRadius: boolean;
  opacity: number;
}

export type XomadCoreButtonAppearance =
  | 'default'
  | 'primary'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-lighter';
