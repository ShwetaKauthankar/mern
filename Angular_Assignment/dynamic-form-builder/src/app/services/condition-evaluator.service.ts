import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConditionRule } from '../models/form-definition.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionEvaluatorService {

  evaluateCondition(rules: ConditionRule[], form: FormGroup): boolean {
    return rules.every(rule => {
      const fieldValue = form.get(rule.field)?.value;
      switch (rule.operator) {
        case '>':
          return fieldValue > rule.value;
        case '>=':
          return fieldValue >= rule.value;
        case '<':
          return fieldValue < rule.value;
        case '<=':
          return fieldValue <= rule.value;
        case '!=':
          return fieldValue !== rule.value;
        case '==':
          return fieldValue === rule.value;
        default:
          return false;
      }
    });
  }
}
