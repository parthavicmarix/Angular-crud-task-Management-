import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatusDropdownComponent } from './task-status-dropdown.component';

describe('TaskStatusDropdownComponent', () => {
  let component: TaskStatusDropdownComponent;
  let fixture: ComponentFixture<TaskStatusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskStatusDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
