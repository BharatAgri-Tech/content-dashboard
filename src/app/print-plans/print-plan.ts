import {PackingItem} from './print-bom';

export interface PrintPlan {
  data: PrintPlanData[];
  message: string;
  status: boolean;
}

export interface PrintPlanData {
  activity_items: PrintPlanActivityItem[];
  activity_data: PrintPlanActivityData;
  execution_date: string;
}

export interface PrintPlanActivityData {
  delta_from_sowing: number;
  instruction: string;
  schedule_type: string;
  schedule_category: string;
  pest: string;
  pest_symptoms: string;
  cost_per_activity: number;
}

export interface PrintPlanActivityItem {
  chemical: Chemical;
  farm_usage: string;
  quantity: number;
  unit: string;
}

export interface Chemical {
  name: string;
  quantity_type: string;
  purpose: string;
  packing_priority_items: PackingItem[];
}
