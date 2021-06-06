import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementsComponent } from './increments/increments.component';
import { DonusComponent } from './donus/donus.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';




@NgModule({
  declarations: [
    IncrementsComponent,
    DonusComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementsComponent,
    DonusComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
