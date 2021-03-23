import { Component, OnInit } from '@angular/core';
import { DepartmentEvent } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'pm-add-department',
  templateUrl: './add-department.component.html'
})
export class AddDepartmentComponent {
  
  constructor(private departmentService:DepartmentService){}

  saveAddDepartment(event:DepartmentEvent):void{
    this.departmentService.updateEventSubject(event);
  }
}
