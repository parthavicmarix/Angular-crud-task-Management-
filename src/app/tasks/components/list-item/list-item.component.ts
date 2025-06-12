import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../models/TaskModel';
import AppPages from 'src/app/common/constants/AppPages';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';
import { UserRole } from 'src/app/common/enums/UserRole';
import { UserModel } from 'src/app/auth/models/UserModel';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() task: TaskModel;
  @Output() updateTaskList = new EventEmitter(false);
  @Output() onError = new EventEmitter(<any>{});
  AppPages = AppPages;
  TaskStatus = TaskStatus;
  UserRole = UserRole;
  user: UserModel;

  constructor(
    private  _authService: AuthService,
    private  _taskService: TaskService,
    private  _dialogService: DialogServiceService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  // Get user data
  getUser() {
    this.user = this._authService.getUser();
  }

  // Delete task
  deleteTask(id: string) {
    this._dialogService.confirmDialog({
      data: {
        title: "Delete Confirm",
        message: "Are you sure want to delete?",
        confirmText: "Delete",
        cancelText: "Cancel",
      },
      panelClass: "delete-task-dialog",
      disableClose: false
    }).subscribe(res => {
      if (res) {
        this._taskService.deleteTask(id).subscribe({
          next: (res) => {
            this.updateTaskList.emit(true); 
          },
          error: (err) => {
            this.onError.emit(err);
          }
        })
      }
    });
  }

  // Mark the task as completed
  markAsComplete(task: TaskModell) {
    if (task.status != TaskStatus.Completed) {
      task.status = TaskStatus.Completed;
      this._taskService.updateTask(task.id, task).subscribe({
        next: () => {
          this.updateTaskList.emit(true);
        },
        error: (err) => {
          this.onError.emit(err);
        }
      });
    }
  }
}
