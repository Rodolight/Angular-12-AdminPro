import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementsComponent } from './increments/increments.component';
import { DonusComponent } from './donus/donus.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    IncrementsComponent,
    DonusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementsComponent,
    DonusComponent
  ]
})
export class ComponentsModule { }
