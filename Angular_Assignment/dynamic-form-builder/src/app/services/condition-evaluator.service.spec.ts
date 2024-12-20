import { TestBed } from '@angular/core/testing';

import { ConditionEvaluatorService } from './condition-evaluator.service';

describe('ConditionEvaluatorService', () => {
  let service: ConditionEvaluatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionEvaluatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
