import { Component, OnInit } from '@angular/core';
import {PlanService} from '../services/plan.service';
import {NGXLogger} from 'ngx-logger';
import {PrintPlan} from './print-plan';

@Component({
  selector: 'app-print-plans',
  templateUrl: './print-plans.component.html',
  styleUrls: ['./print-plans.component.scss']
})
export class PrintPlansComponent implements OnInit {

  subscriptionId = '';
  language = '';
  notSortedPrintPlans = {} as PrintPlan;
  printPlans = {} as PrintPlan;

  constructor(
    private planService: PlanService,
    private logger: NGXLogger
  ) { }

  ngOnInit() {
  }

  getPrintPlans() {
    this.planService.getPrintPlans(this.subscriptionId, this.language).subscribe(
      data => {
        this.printPlans = data;
        console.log(this.printPlans);
      }, error =>
      {
        this.logger.error('Get print plan failed', error);
      }
    );
  }

  sortFunc(a: any, b: any) {
    return new Date(a.execution_date).getTime() - new Date(b.execution_date).getTime();
  }

}
