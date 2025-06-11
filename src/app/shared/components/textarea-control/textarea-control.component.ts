import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.scss']
})
export class TextareaControlComponent {
  @Input('formGroup') formGroup: FormGroup;
  @Input('fieldName') fieldName: string;
  @Input('fieldLabel') fieldLabel: string;
}
