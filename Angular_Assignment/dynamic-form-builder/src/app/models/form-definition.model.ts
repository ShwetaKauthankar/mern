export interface FormField {
    fieldtype: string;
    name: string;
    group: string;
    validator?: string[];
    condition?: string;
    rules?: ConditionRule[];
    selectList?: string[];
  }
  
  export interface ConditionRule {
    field: string;
    operator: string;
    value: any;
  }
  
  export type FormDefinition = FormField[];