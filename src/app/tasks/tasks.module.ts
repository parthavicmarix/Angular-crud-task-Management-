import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { ListContainerComponent } from './components/list/list-container.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './components/list-item/list-item.component';


@NgModule({
  declarations: [
    ListContainerComponent,
    AddEditComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class TasksModule { }
