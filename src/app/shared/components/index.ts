import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from './countdown/countdown.component';
import { BarComponent } from './bar/bar.component';
import { RatingComponent } from './rating/rating.component';

export const COMPONENTS = [
  CountdownComponent,
  BarComponent,
  RatingComponent
];


@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: COMPONENTS
})
export class ComponentsModule { }
