import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/services';
import { NotFoundPageComponent } from './core/containers';
import { HomePageComponent } from './core/containers/home-page.component';



export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'projects',
    loadChildren: () => import('@bb-app/projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
