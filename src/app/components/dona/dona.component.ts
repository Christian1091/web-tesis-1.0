import { Component, Input } from '@angular/core';
//import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  /**Mandare el title en el htm de dona */
  @Input() title: string = 'Sin titulo';

  // @Input('labels') public doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  // @Input('data') public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  // ];

}
