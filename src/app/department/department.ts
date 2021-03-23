export interface IDepartmentResult {
  succeeded:boolean;
  message?:string;
  error?:string;
  data:IDepartment[];

}
export interface IDepartment{
  departmentId: number;
  departmentName: string;
}


export type DepartmentEventType = 'initial'|'Add' | 'Edit' | 'Delete' |'Save';
export class DepartmentEvent{
    eventType:DepartmentEventType;
    value?:IDepartment;
}
