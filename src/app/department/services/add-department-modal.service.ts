import { Injectable, Pipe } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AddDepartmentModalService {
  private modalSubject = new BehaviorSubject<boolean>(false);

  addDepartmentModal$ = this.modalSubject.asObservable().pipe(
    switchMap(
      (openLookup): Observable<string> => {
        if (openLookup) {
          return this.showAddDepartmentModal();
        }
        return of('');
      }
    )
  );
  constructor(private modalService: MatDialog) {}

  showModal(isOpen: boolean): void {
    this.modalSubject.next(isOpen);
  }

  private showAddDepartmentModal(): Observable<string> {
    const dialog = this.modalService.open(AddDepartmentComponent);
    dialog.componentInstance.dialog = dialog;
    return dialog.afterClosed().pipe(map((result): string => result));
  }
}
