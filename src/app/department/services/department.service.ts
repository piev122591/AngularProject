import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, iif, Observable, of, throwError, merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DepartmentEvent, IDepartment, IDepartmentResult } from '../department';
import { AddDepartmentModalService } from './add-department-modal.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  // private departmentUrl = 'https://localhost:44328/api/Department';

  private dept = {
    succeeded: true,
    data: [
      {
        departmentId: 1,
        departmentName: 'Depart1',
      },
    ],
  };

  private actionSubject = new BehaviorSubject<DepartmentEvent>({
    eventType: 'initial',
  });
  private action$ = this.actionSubject.asObservable();

  constructor(
    private http: HttpClient,
    private addDepartmentModalService: AddDepartmentModalService
  ) {}
  setAction(event: DepartmentEvent) {
    this.actionSubject.next(event);
  }

  getDepartmentData(): Observable<IDepartment[]> {
    return this.getDepartment().pipe(
      switchMap(
        (data): Observable<IDepartment[]> => this.departmentEvents(data)
      )
    );
  }

  setAddDepartmentResult(department: string): string {
    if (department && department !== '') {
      this.actionSubject.next({
        eventType: 'Save',
        value: {
          departmentId: 0,
          departmentName: department,
        },
      });
    }
    return department;
  }

  private getDepartment(): Observable<IDepartment[]> {
    // return this.http.get<IDepartmentResult>(this.departmentUrl).pipe(
    //   map((result) => {
    //     console.log(result.data);
    //     return result.data;
    //   }),
    //   catchError(this.handleError)
    // );

    return of(this.dept.data);
  }

  private departmentEvents(data: IDepartment[]): Observable<IDepartment[]> {
    return merge(this.onCloseModal(data), this.showAddDepartmentModal(data));
  }
  private onCloseModal(data: IDepartment[]): Observable<IDepartment[]> {
    return this.action$.pipe(
      switchMap(
        (event): Observable<IDepartment[]> => {
          return event.eventType === 'Save'
            ? this.saveAddDepartment(event.value).pipe(
                map((result) => result.data)
              )
            : of(data);
        }
      )
    );
  }

  saveAddDepartment(value: IDepartment): Observable<IDepartmentResult> {
    // return this.http.post<IDepartmentResult>(
    //   'https://localhost:44328/api/department/',
    //   {
    //     DepartmentName: value.departmentName,
    //   }
    // );
    const currStor = this.dept.data;
    currStor.push({
      departmentId: currStor.length + 1,
      departmentName: value.departmentName,
    });
    return of(this.dept);
  }

  private showAddDepartmentModal(
    data: IDepartment[]
  ): Observable<IDepartment[]> {
    return this.action$.pipe(
      switchMap(
        (action): Observable<IDepartment[]> => {
          return action.eventType === 'Add'
            ? new Observable((): void =>
                this.addDepartmentModalService.showModal(true)
              ).pipe(map((): IDepartment[] => data))
            : of(data);
        }
      )
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
