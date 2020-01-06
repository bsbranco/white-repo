import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent,SignUpPageComponent } from './containers';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'sign-up', component: SignUpPageComponent,  data: { title: 'Register' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
