import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, from, iif, Observable, of, Subject, Subscriber, throwError } from 'rxjs';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';
import { DepartmentEvent, IDepartment, IDepartmentResult } from './department';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  private departmentUrl = 'https://localhost:44328/api/Department';
 private departmentEventSubject = new BehaviorSubject<DepartmentEvent>({eventType:'initial'});
  private departmentEvent$ = this.departmentEventSubject.asObservable();

  constructor(private http: HttpClient,private modalService: NgbModal) { }
  updateEventSubject(event: DepartmentEvent) {
   this.departmentEventSubject.next(event);
  }

  getDepartmentData():Observable<any>{
   return this.getDepartment().pipe(switchMap((data):any=>this.departmentEvents(data)))
  }

  getDepartment(): Observable<IDepartment[]> {
    return this.http.get<IDepartmentResult>(this.departmentUrl)
      .pipe(
        map(result => { console.log(result.data);return result.data}),
        catchError(this.handleError)
      );
  }

  private departmentEvents(data:IDepartment[]):Observable<any>{
    return this.onCloseModal(data);
  }
  private onCloseModal(data:IDepartment[]):Observable<any>{
    return this.departmentEvent$.pipe(switchMap((event):Observable<any>=>{
      return iif(():boolean=>event.eventType ==='Save'),this.saveAddDepartment(event.value),of(data);
    }))
  }
 private manageEvent(event:DepartmentEvent):Observable<void>{
    switch(event.eventType){
      case 'Add':
        return this.showAddDepartmentModal().pipe(mapTo(undefined));
        break;
    }
  }
  private showAddDepartmentModal():Observable<void>{

    this.modalService.open(AddDepartmentComponent);
    return of(undefined);
    }
  private saveAddDepartment(value:IDepartment):Observable<IDepartmentResult>{

      return this.http.post<IDepartmentResult>("https://localhost:44328/api/department/",{
        DepartmentName:value.departmentName
      });


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
