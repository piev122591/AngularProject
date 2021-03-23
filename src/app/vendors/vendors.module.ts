import { NgModule } from '@angular/core';

import { VendorsComponent } from './vendors.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VendorsComponent],
  imports: [
    RouterModule.forChild([
      { path: 'vendors', component: VendorsComponent },

    ]),
    SharedModule
  ]
})
export class VendorsModule { }
