import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS, metaReducers} from './reducers';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects, RouterEffects } from './core/effects';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './core/containers';
// import { EffectsModule } from '@ngrx/effects';
// import { UserEffects, RouterEffects } from './core/effects';
// import { CoreModule } from './core/core.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     BrowserModule,
//     CoreModule,
//     AppRoutingModule,
//     EffectsModule.forRoot([UserEffects, RouterEffects]),
//   ],
//   providers: [],
//     bootstrap: [AppComponent]
// })
// export class AppModule { }


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App',

      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://ngrx.io/guide/effects#registering-root-effects
     */
    EffectsModule.forRoot([UserEffects, RouterEffects]),
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
