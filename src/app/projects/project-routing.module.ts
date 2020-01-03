import { ProjectDetailComponent } from './containers/project-detail/project-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [
  {
    // path: ':id',
    path: '',
    component: ProjectDetailComponent,
    // canActivate: [ProjectExistsGuard],
    data: { title: 'Project details' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
