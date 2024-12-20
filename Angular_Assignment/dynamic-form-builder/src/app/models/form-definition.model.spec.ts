// form-definition.model.spec.ts
import { FormDefinition, FormField } from './form-definition.model';

describe('FormDefinition', () => {
  it('should create a valid FormDefinition', () => {
    const formDefinition: FormDefinition = [
      {
        fieldtype: 'text',
        name: 'firstName',
        group: 'personalInfo',
        validator: ['required'],
      },
      {
        fieldtype: 'email',
        name: 'email',
        group: 'contactInfo',
        validator: ['required', 'email'],
      }
    ];

    expect(formDefinition).toBeTruthy();
    expect(formDefinition.length).toBe(2); // Check that we have two fields
    expect(formDefinition[0].name).toBe('firstName'); // Check the first field's name
  });
});