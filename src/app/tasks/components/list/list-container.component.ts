import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/TaskModel';
import AppPages from 'src/app/common/constants/AppPages';
import { TaskService } from '../../services/task.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core'; 
 
@Component({
  selector: 'task-list-container',
  templateUrl: './list-container.component.html', 
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {
  AppPages = AppPages;
  taskList: TaskModel[];
  durationInSeconds = 5;

  constructor(
    private  _taskService: TaskService,
    private  _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    // Load tasks for list from task behaviour subject 
    this._taskService.tasks$.subscribe({
      next: (res) => {
        this.taskList = res;
      },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  // Get all tasks
  loadTasks() {
    this._taskService.getTasks().subscribe({
      next: (res) => { },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  updateTaskList(ev: boolean) {
    if (ev) {
      this.loadTasks();
    }
  }

  onApiError(err: HttpErrorResponse) {
    this.opneSnackbar(err);
  }

  // Drop event on task card drop
  drop(event: CdkDragDrop<TaskModel[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
    this.taskList.forEach((task, index) => task.order = index + 1);
    this._taskService.updateTasksOrder(this.taskList).subscribe({
      next: (res) => { },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  // Show error snackbar message
  opneSnackbar(errMsg: any) {
    this._snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: errMsg,
      panelClass: 'error-snackbar'
    });
  }
}
