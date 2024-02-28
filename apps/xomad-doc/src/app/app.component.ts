import { AfterViewInit, Component } from '@angular/core';
import { XoShepherdService } from '@xomad/web-core/services';

const MY_CUSTOM_HTML = `
  <div style="border: 5px dashed var(--color-secondary-light); padding: var(--space-xs) var(--space-md)">
    <h1>PINK</h1>
    <code>hello-world</code>
  </div>
`;

@Component({
  selector: 'web-core-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private shepherd: XoShepherdService,
  ) {
  }

  ngAfterViewInit() {
    this.showModal();``
  }

  showModal() {
    this.shepherd.addSteps({
      scrollLock: true,
      doNotShowAgain: true,
      steps: [
        {
          text: 'content here',
          title: 'title here',
          attachTo: { element: '.wrapper', on: 'bottom' },
          buttons: [{
            action: () => this.shepherd.next(),
            classes: 'xo-button xo-raised-button data-appearance-primary',
            text: 'next',
          }],
          onDoNotShowAgain: console.log,
        },
        {
          text: MY_CUSTOM_HTML,
          title: 'table of content',
          attachTo: { element: 'ul', on: 'bottom' },
          relevantElements: ['h3'],
          onDoNotShowAgain: (checked) => console.log('table of content' + checked)
        }
      ],
    });
    this.shepherd.start();
  }
}
