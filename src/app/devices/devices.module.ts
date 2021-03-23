import { NgModule } from '@angular/core';
import { DevicesComponent } from './devices.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DevicesComponent],
  imports: [
    RouterModule.forChild([
      { path: 'devices', component: DevicesComponent },

    ]),
    SharedModule,
  ]
})
export class DevicesModule { }
