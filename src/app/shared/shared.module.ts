import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule,
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
