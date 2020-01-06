import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';



import * as fromAuth from './reducers';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { LoginFormComponent, LogoutConfirmationDialogComponent } from './components';
import { AuthEffects } from './effects';
import { SignUpPageComponent, LoginPageComponent } from './containers';

export const COMPONENTS = [
  SignUpPageComponent,
  LoginPageComponent,
  LoginFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: COMPONENTS,
  entryComponents: [LogoutConfirmationDialogComponent],
})
export class AuthModule {}
