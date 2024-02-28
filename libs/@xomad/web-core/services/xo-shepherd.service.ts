import { Inject, Injectable, InjectionToken, OnDestroy, Optional } from '@angular/core';
import { merge } from 'lodash';
import { fromEvent, Subject } from 'rxjs';
import { XoScrollDisabledHandler } from '@xomad/web-core/utils';
import { ShepherdService } from 'angular-shepherd';

// all Shepherd configs: https://github.com/shepherd-pro/shepherd/blob/a0d252723d6bc9906cbcec4a988755ffa8ae9311/src/js/step.js#L25
export interface XoShepherdConfig {
  steps: Array<Omit<any, 'relevantElements'> & { relevantElements?: string[] }>;
  scrollLock: boolean;
  doNotShowAgain?: boolean;
  attachTo: { element: string; on: string };
  classes: string;
}

export const SHEPHERD_CONFIG = new InjectionToken<Partial<XoShepherdConfig>>('SHEPHERD_CONFIG', {
  factory: () => ({ scrollLock: true }),
});

const generateDoNotShowAgainTemplate = (index: number) => `
  <div class="xomad-shepherd-remember-choice">
    <input type="checkbox" class="shepherd-checkbox" id="shepherd-checkbox-${index}" hidden>
    <label for="shepherd-checkbox-${index}" class="d-flex align-items-center gap-1">
      <span data-checked hidden class="icon material-icons">check_box</span>
      <span data-unchecked hidden class="icon material-icons">check_box_outline_blank</span>
      Do not show this message again
    </label>
  </div>
`;

@Injectable()
export class XoShepherdService implements OnDestroy {
  private _overlayPane: HTMLDivElement = null;
  private _config: XoShepherdConfig = null;

  // see https://shepherdjs.dev/docs/Step.html
  afterClosed$ = new Subject<unknown>();

  constructor(
    @Inject(SHEPHERD_CONFIG) shepherdConfig: XoShepherdConfig,
    private readonly _shepherdService: ShepherdService,
  ) {
    this._config = merge(
      {
        classes: 'xomad-shepherd',
        cancelIcon: { enabled: true },
        scrollTo: true,
        scrollToHandler: (e: HTMLElement) => e.scrollIntoView({ behavior: 'smooth', block: 'center' }),
        buttons: [
          {
            action: this._closeShepherd,
            classes: 'xo-button xo-raised-button data-appearance-primary',
            text: 'trans:modal.btn.yes',
          },
        ],
      },
      shepherdConfig,
    );
  }

  addSteps(config?: Partial<XoShepherdConfig>): XoShepherdService {
    this._config = this._mergeDefaultConfig(this._config, config);
    this._shepherdService.defaultStepOptions = this._config;
    this._addSteps(config.steps, config.doNotShowAgain);
    return this;
  }

  start(debounce?: number) {
    this._registerEvent();
    setTimeout(() => this._shepherdService.start(), debounce || 0);
    return this;
  }

  ngOnDestroy() {
    this._closeShepherd();
  }

  getIndex(steps, step) {
    return steps.indexOf(step);
  }

  next() {
    this._shepherdService.next();
  }

  private _addSteps(steps: XoShepherdConfig['steps'], doNotShowAgain?: boolean) {
    const newSteps = steps.map((step, index) => ({
      ...step,
      text: doNotShowAgain ? step.text + generateDoNotShowAgainTemplate(index) : step.text,
    }));
    this._shepherdService.addSteps(newSteps);
  }

  private _closeShepherd = () => {
    if (!this._shepherdService.isActive) return;
    this.next();
  }

  private _registerEvent() {
    ['show', 'inactive', 'start', 'complete', 'cancel'].forEach((event) => {
      this._shepherdService.tourObject.on(event, data => {
        switch (event) {
          case 'show':
            if (data.tour.currentStep) this._releaseHighlightElements(data.tour.currentStep.options.relevantElements);
            setTimeout(() => {
              this._markHighlight(data.tour.currentStep.options.relevantElements);
              this._onDoNotShowAgain(data.tour.currentStep.el, this.getIndex(data.tour.steps, data.tour.currentStep));
            });
            break;
          case 'inactive':
            this._releaseHighlightElements(data.tour.currentStep.options.relevantElements);
            break;
          case 'start':
            this._attachTourOverlay();
            if (this._config.scrollLock) XoScrollDisabledHandler.lockScroll();
            break;
          case 'complete':
          case 'cancel':
            document.querySelectorAll('.shepherd-step').forEach(el => el.remove());
            document.body.removeChild(this._overlayPane);
            XoScrollDisabledHandler.releaseScroll();
            this.afterClosed$.next();
            break;
        }
      });
    });
  }

  private _onDoNotShowAgain(element: HTMLDivElement, currentStepIndex: number) {
    // TODO: auto generate checkbox zone and remove this DOM in app.message.ts
    const el = element.querySelector('.xomad-shepherd-remember-choice input[type="checkbox"]') as HTMLInputElement;
    if (!el) return null;
    el.addEventListener('change', () => {
      this._config.steps[currentStepIndex].onDoNotShowAgain(el.checked);
    });
  }

  private _mergeDefaultConfig<
    T extends XoShepherdConfig,
    U extends Partial<XoShepherdConfig>
  >(original: T, extra: U): T {
    return {
      ...original,
      ...extra,
      classes: `${original.classes} ${extra.classes || ''}`,
    };
  }

  private _attachTourOverlay() {
    this._overlayPane = document.createElement('div');
    this._overlayPane.classList.add('xomad-shepherd-tour-overlay');
    this._overlayPane.addEventListener('click', this._closeShepherd);
    document.body.appendChild(this._overlayPane);
  }

  private _markHighlight(elements: string[]) {
    (elements || []).forEach((element) => {
      const el = document.querySelector(element);
      if (!el) return;
      el.classList.add('shepherd-target', 'shepherd-enabled');
    });
  }

  private _releaseHighlightElements(elements: string[]) {
    (elements || []).forEach((element) => {
      const el = document.querySelector(element);
      if (!el) return;
      el.classList.remove('shepherd-target', 'shepherd-enabled');
    });
  }
}
