import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sampleFormDefinition } from 'src/app/sample-form-definition';

interface Field {
  fieldtype: string;
  name: string;
  group: string;
  validator?: string[];
  condition?: string;
  rules?: any[];
  selectList?: string[];
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() formDefinition: Field[] = sampleFormDefinition;
  form: FormGroup = this.fb.group({});
  formData: any = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.formDefinition.forEach(field => {
      const validators = this.getValidators(field.validator);
      this.form.addControl(field.name, this.fb.control('', validators));
    });
  }

  getValidators(validators: string[] | undefined) {
    const formValidators = [];
    if (validators) {
      if (validators.includes('required')) {
        formValidators.push(Validators.required);
      }
    }
    return formValidators;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formData = this.form.value;
      console.log('Form Submitted', this.formData);
    } else {
      console.log('Form is invalid');
    }
  }
}