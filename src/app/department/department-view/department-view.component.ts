import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DepartmentEvent, IDepartment } from '../department';

@Component({
  selector: 'pm-department-view',
  templateUrl: './department-view.component.html',
})
export class DepartmentViewComponent {
  
 @Input() department:IDepartment[];

 @Output() addDepartmentEvent = new EventEmitter<DepartmentEvent>();

 addDepartment():void{
   this.addDepartmentEvent.emit({
     eventType:'Add'
   })
 }
}
