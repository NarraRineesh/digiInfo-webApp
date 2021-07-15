import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MISRoutingModule } from './mis-routing.module';
import { MisSubComponent } from './mis/mis.component';


@NgModule({
  declarations: [MisSubComponent],
  imports: [
    CommonModule,
    MISRoutingModule
  ]
})
export class MISModule { }
