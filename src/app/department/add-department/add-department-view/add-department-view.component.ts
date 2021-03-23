import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { DepartmentEvent } from '../../department';

@Component({
  selector: 'pm-add-department-view',
  templateUrl: './add-department-view.component.html',
  styleUrls: ['./add-department-view.component.css']
})
export class AddDepartmentViewComponent  {

  @Output() departmentEvent = new EventEmitter<DepartmentEvent>();
  departmentForm = new FormGroup({
    departmentName: new FormControl(''),
  });

  onSubmit(){
    this.departmentEvent.emit({
      eventType:'Save',
      value:this.departmentForm.value
    })
  }

}
