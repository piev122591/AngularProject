import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DepartmentEvent } from '../department';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { tap } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class AddDepartmentService {
  constructor() {}

  approverEvent(
    event: DepartmentEvent,
    dialog: MatDialogRef<AddDepartmentComponent, any>
  ): Observable<string> {
    return this.manageEvent(event).pipe(
      tap((result): void => {
        dialog.close(result);
      })
    );
  }
  private manageEvent(event: DepartmentEvent): Observable<string> {
    if (event.eventType === 'Save') {
      return of(event.value.departmentName);
    } else {
      return of('');
    }
  }
}
