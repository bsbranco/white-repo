
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { AppComponent } from './containers/app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  FooterComponent
];


@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: COMPONENTS
})
export class CoreModule { }
