import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonAlertComponent } from './components/common-alert/common-alert.component';
import { CommonSnackbarComponent } from './components/common-snackbar/common-snackbar.component';
import { TaskStatusDropdownComponent } from './components/task-status-dropdown/task-status-dropdown.component';
import { MatComponentsModule } from './mat-components.module';
import { TaskStatusPipe } from '../pipes/task-status.pipe';
import { DatepickerControlComponent } from './components/datepicker-control/datepicker-control.component';
import { InputControlComponent } from './components/input-control/input-control.component';
import { TextareaControlComponent } from './components/textarea-control/textarea-control.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CommonAlertComponent,
    CommonSnackbarComponent,
    TaskStatusDropdownComponent,
    TaskStatusPipe,
    DatepickerControlComponent,
    InputControlComponent,
    TextareaControlComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatComponentsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonAlertComponent,
    CommonSnackbarComponent,
    TaskStatusDropdownComponent,
    DatepickerControlComponent,
    InputControlComponent,
    TextareaControlComponent,
    MatComponentsModule,
    TaskStatusPipe
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule { }
