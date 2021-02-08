import {Component, Input, OnInit} from '@angular/core';
import {PrintPlanData} from '../print-plan';

@Component({
  selector: 'app-print-plan-card',
  templateUrl: './print-plan-card.component.html',
  styleUrls: ['./print-plan-card.component.scss']
})
export class PrintPlanCardComponent implements OnInit {

  @Input() printPlan: PrintPlanData = {} as PrintPlanData;

  constructor() { }

  ngOnInit(): void {
  }

  sortPackingFunc(a: any, b: any) {
    return a.priority - b.priority;
  }

}
