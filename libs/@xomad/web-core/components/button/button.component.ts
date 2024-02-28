import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { CLASSES_MAP_PAIR } from './button.const';
import { XomadCoreButtonAppearance, XomadCoreButtonConfig } from './button.type';
import { InputBoolean, InputNumber } from '@xomad/web-core/utils';
import { XO_BUTTON_CONFIG } from './button.di';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: `
    button[xo-raised-button],
    button[xo-icon-button],
    button[xo-fab-icon],
    button[xo-outlined-button],
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class XomadCoreButtonComponent implements OnInit {
  static ngAcceptInputType_disabled: boolean | string;
  static ngAcceptInputType_withShadow: boolean | string;

  constructor(
    private readonly el: ElementRef<HTMLButtonElement>,
    @Inject(XO_BUTTON_CONFIG) private readonly buttonConfig: XomadCoreButtonConfig,
  ) {
  }

  @HostBinding('disabled')
  @InputBoolean()
  @Input() disabled = false;

  @HostBinding('attr.data-with-shadow')
  @InputBoolean()
  @Input() withShadow = this.buttonConfig.shadow || false;

  @Input() appearance: XomadCoreButtonAppearance = 'default';

  @HostBinding('class')
  get dataAppearanceClass() {
    return `xo-button data-appearance-${this.appearance}`;
  }

  @Input() @InputNumber() opacity = 1;

  ngOnInit() {
    for (const pair of CLASSES_MAP_PAIR) {
      if (this.hasAttr(pair.selector)) {
        this.el.nativeElement.classList.add(...pair.classes);
      }
    }
  }


  ngAfterViewChecked() {
    if (this.opacity !== 1) {
      this.recomputeBackgroundColor(this.opacity);
    }
  }

  private recomputeBackgroundColor(opacity: number) {
    const bg = getComputedStyle(this.el.nativeElement).backgroundColor;
    this.el.nativeElement.style.background = bg.replace(')', `,${opacity})`);
  }

  private hasAttr(selector: string) {
    return this.el.nativeElement.hasAttribute(selector);
  }
}

