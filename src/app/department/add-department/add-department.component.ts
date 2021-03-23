import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DepartmentEvent } from '../department';
import { DepartmentService } from '../services/department.service';
import { AddDepartmentService } from '../services/add-department.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pm-add-department',
  templateUrl: './add-department.component.html',
  providers: [AddDepartmentService],
})
export class AddDepartmentComponent {
  private eventSubject = new Subject<DepartmentEvent>();

  dialog: MatDialogRef<AddDepartmentComponent, any>;

  event$ = this.eventSubject
    .asObservable()
    .pipe(
      switchMap(
        (event): Observable<string> =>
          this.addDepartmentService.approverEvent(event, this.dialog)
      )
    );

  constructor(private addDepartmentService: AddDepartmentService) {}

  departmentEvent(event: DepartmentEvent): void {
    this.eventSubject.next(event);
  }
}
