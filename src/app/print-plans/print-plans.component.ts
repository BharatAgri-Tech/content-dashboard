import { Component, OnInit } from '@angular/core';
import {PlanService} from '../services/plan.service';
import {NGXLogger} from 'ngx-logger';
import {PrintPlan, PrintPlanData} from './print-plan';
import {PrintBom} from './print-bom';

@Component({
  selector: 'app-print-plans',
  templateUrl: './print-plans.component.html',
  styleUrls: ['./print-plans.component.scss']
})
export class PrintPlansComponent implements OnInit {

  subscriptionId = '';
  language = '';
  printPlans = {} as PrintPlan;
  printBom = {} as PrintBom;

  constructor(
    private planService: PlanService,
    private logger: NGXLogger
  ) { }

  ngOnInit() {
    this.printPlans.data = [] as PrintPlanData[];
  }

  getPrintPlans() {
    this.planService.getPrintPlans(this.subscriptionId, this.language).subscribe(
      data => {
        this.printPlans = data;
        this.logger.info('Print plan template: ', this.printPlans);
      }, error =>
      {
        this.logger.error('Get print plan failed', error);
      }
    );
    this.getBomDetails();
  }

  getBomDetails() {
    this.planService.getBomdetails(this.subscriptionId, this.language).subscribe(
      data => {
        this.printBom = data;
        this.logger.info('Print bom details: ', this.printBom);
      }, error =>
      {
        this.logger.error('Get print bom details failed', error);
      }
    );
  }

  sortFunc(a: any, b: any) {
    return new Date(a.execution_date).getTime() - new Date(b.execution_date).getTime();
  }

}
