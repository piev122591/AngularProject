import { Component, OnInit } from '@angular/core';
import { DepartmentEvent, IDepartment } from './department';
import { DepartmentService } from './department.service';
@Component({
  selector: 'pm-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  pageTitle = 'Department List';
  errorMessage = '';


  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDepartment = this.listFilter ? this.performFilter(this.listFilter) : this.department;
  }


  filteredDepartment: IDepartment[] = [];
  department: IDepartment[] = [];

  performFilter(filterBy: string): IDepartment[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.department.filter((product: IDepartment) =>
      product.departmentName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  departmentList = this.departmentService.getDepartment();
  event$ = this.departmentService.departmentEvent$;
  constructor(private departmentService: DepartmentService) { }
  addDepartmentEvent(event:DepartmentEvent):void{
    this.departmentService.updateEventSubject(event);
  } 
  ngOnInit(): void {
    // this.departmentService.getDepartment().subscribe({
    //   next: department => {
    //     this.department = department;
    //     this.filteredDepartment = this.department;
    //   },
    //   error: err => this.errorMessage = err
    // });
  }

}
