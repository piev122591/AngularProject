import { Component, OnInit } from '@angular/core';
import { DepartmentEvent, IDepartment, IDepartmentResult } from './department';
import { DepartmentService } from './services/department.service';
import { AddDepartmentModalService } from './services/add-department-modal.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'pm-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService, AddDepartmentModalService],
})
export class DepartmentComponent implements OnInit {
  addDepartmentModal$ = this.addDepartmentModalService.addDepartmentModal$.pipe(
    map((department): string => {
      return this.departmentService.setAddDepartmentResult(department);
    })
  );
  departmentList$: Observable<IDepartment[]>;
  constructor(
    private departmentService: DepartmentService,
    private addDepartmentModalService: AddDepartmentModalService
  ) {}
  ngOnInit(): void {
    this.departmentList$ = this.departmentService.getDepartmentData();
  }

  setAction(event: DepartmentEvent): void {
    this.departmentService.setAction(event);
  }
}
