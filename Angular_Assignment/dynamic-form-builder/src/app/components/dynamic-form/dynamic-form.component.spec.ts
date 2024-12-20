import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture< DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.formDefinition = [
      { fieldtype: 'text', name: 'Order No', group: 'General Information', validator: ['required'] },
      { fieldtype: 'date', name: 'OrderedDate', group: 'General Information', validator: ['required'] },
      { fieldtype: 'text', name: 'OrderedInfo', group: 'General Information', validator: ['required'], condition: 'and', rules: [{ field: 'OrderedDate', operator: '!=', value: '' }] },
      { fieldtype: 'number', name: 'Price', group: 'Product Information', validator: ['required']},
      { fieldtype: 'boolean', name: 'Refurbished', group: 'Product Information', selectList: ['Yes', 'No'] },
      { fieldtype: 'text', name: 'Address', group: 'Product Information', condition: 'or', rules: [{ field: 'Order No', operator: '>=', value: '100' }, { field: 'Price', operator: '<=', value: '100' }] }
    ];
    fixture.detectChanges();
  });

  it('should create the form with required fields', () => {
    expect(component.form.contains('Order No')).toBeTruthy();
    expect(component.form.contains('OrderedDate')).toBeTruthy();
    expect(component.form.contains('Price')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const orderNoControl = component.form.get('Order No');
    orderNoControl?.setValue('');
    expect(orderNoControl?.valid).toBeFalsy();
  });

  it('should submit the form when valid', () => {
    component.form.get('Order No')?.setValue('Snitch 123');
    component.form.get('OrderedDate')?.setValue('23/06/2024');
    component.form.get('Price')?.setValue('200');
    component.form.get('Refurbished')?.setValue('No');
    component.form.get('Address')?.setValue('Indiranagar Bangalore');

    component.onSubmit();
    expect(component.formData).toEqual({
      'Order No': 'Snitch 123',
      'OrderedDate': '23/06/2024',
      'Price': '200',
      'Refurbished': 'No',
      'Address': 'Indiranagar Bangalore'
    });
  });
});