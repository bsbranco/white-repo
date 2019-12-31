import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bb-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:
    `<article>
            <h4>Oops!</h4>
            <div>We are looking for your page... but we can't find it</div>
        </article>`
  ,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class NotFoundPageComponent { }
