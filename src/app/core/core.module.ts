import { MaterialModule } from './../material/material.module';

import { NotFoundPageComponent } from './containers/not-found-page.component';
import { AppComponent } from './containers/app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './containers/home-page.component';
import { HeaderComponent, FooterComponent } from './components';


export const COMPONENTS = [
  AppComponent,
  HomePageComponent,
  NotFoundPageComponent,
  HeaderComponent,
  FooterComponent
];


@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule
  ],
  exports: COMPONENTS
})
export class CoreModule { }
