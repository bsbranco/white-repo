import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './containers/project-detail/project-detail.component';
import { ProjectsRoutingModule } from './project-routing.module';



@NgModule({
  declarations: [ProjectDetailComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
