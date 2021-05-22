import { Component, Input } from '@angular/core';
import { MultiDataSet,Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-donus',
  templateUrl: './donus.component.html',
  styles: [
  ]
})
export class DonusComponent {

  @Input() title = "Sin título"
  @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ]

   public colors : Color[] = [

    {backgroundColor:['#6857E6', '#009FFE', '#F02059']}
  ]

}
