import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.scss']
})
export class InputControlComponent {
  @Input('formGroup') formGroup: FormGroup;
  @Input('fieldName') fieldName: string;
  @Input('fieldLabel') fieldLabel: string;
}
