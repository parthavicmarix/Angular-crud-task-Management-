import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/TaskModel';
import AppPages from 'src/app/common/constants/AppPages';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId = '';
  isEditMode = false;
  taskList: TaskModel[] = [];
  minDate = new Date();
  AppPages = AppPages;
  durationInSeconds = 5;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _taskService: TaskService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Task form initialization
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });

    // Get all tasks
    this._taskService.tasks$.subscribe(tasks => {
      this.taskList = tasks || [];
    });

    // Get task id from route and set edit mode
    const taskIdParam = this._route.snapshot.paramMap.get('id');
    if (taskIdParam !== null) {
      this.taskId = taskIdParam;
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  // Get single task based on id
  loadTask(taskId: string) {
    this._taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (err) => {
        this.opneSnackbar(err);
      }
    });
  }

  //  Change task order
  getNewTaskOrder(): number {
    if (this.taskList.length === 0) {
      return 1;
    }
    const highestOrderTask = this.taskList.reduce((prev, current) => (prev.order > current.order) ? prev : current, { order: 0 });
    return highestOrderTask.order + 1;
  }

  // Submit task form
  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    let formData = this.taskForm.value;
    const newTask: TaskModel = {
      ...formData,
      id: this.isEditMode ? this.taskId : new Date().getTime().toString(),
      order: this.isEditMode ? this.findTaskOrderById(this.taskId) : this.getNewTaskOrder()
    };

    if (this.isEditMode) {
      // Edit task
      this._taskService.updateTask(this.taskId, newTask).subscribe({
        next: (res) => {
          this._router.navigate(['/tasks']);
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      });
    } else {
      // Add task
      this._taskService.addTask(newTask).subscribe({
        next: (res) => {
          this._router.navigate(['/tasks']);
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      });
    }
  }

  // Find task order based on task id
  findTaskOrderById(id: string): number {
    const task = this.taskList.find(task => task.id === id);
    return task ? task.order : 1;
  }

  // Show error snackbar
  opneSnackbar(errMsg: any) {
    this._snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: errMsg,
      panelClass: 'error-snackbar'
    });
  }
}
