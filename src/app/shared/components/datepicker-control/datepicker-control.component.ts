import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'datepicker-control',
  templateUrl: './datepicker-control.component.html',
  styleUrls: ['./datepicker-control.component.scss']
})
export class DatepickerControlComponent {
  @Input('formGroup') formGroup: FormGroup;
  @Input('fieldName') fieldName: string;
  @Input('fieldLabel') fieldLabel: string;
  @Input('minDate') minDate: Date;
  @Input('maxDate') maxDate: Date;
  @Input('inputReadOnly') inputReadOnly: boolean;
}
