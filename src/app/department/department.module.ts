import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddDepartmentViewComponent } from './add-department/add-department-view/add-department-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDepartmentModalService } from './services/add-department-modal.service';
import { DepartmentService } from './services/department.service';
import { AddDepartmentService } from './services/add-department.service';

@NgModule({
  declarations: [
    DepartmentComponent,
    DepartmentViewComponent,
    AddDepartmentComponent,
    AddDepartmentViewComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'department', component: DepartmentComponent },
    ]),
    SharedModule,
  ],
  providers: [
    AddDepartmentModalService,
    DepartmentService,
    AddDepartmentService,
  ],
})
export class DepartmentModule {}
