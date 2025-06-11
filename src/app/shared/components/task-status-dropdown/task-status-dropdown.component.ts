import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TaskStatus } from 'src/app/common/enums/TaskStatus';

@Component({
  selector: 'task-status-dropdown',
  templateUrl: './task-status-dropdown.component.html',
  styleUrls: ['./task-status-dropdown.component.scss']
})
export class TaskStatusDropdownComponent {
  @Input('formGroup') formGroup: FormGroup;
  @Input('fieldName') fieldName: string;
  @Input('fieldLabel') fieldLabel: string;
  @Output('changeEvent') changeEvent = new EventEmitter<MatSelectChange>();
  TaskStatus = TaskStatus;
  taskStatusValues: string[];

  ngOnInit(): void {
    this.taskStatusValues = Object.values(this.TaskStatus);
  }
}
