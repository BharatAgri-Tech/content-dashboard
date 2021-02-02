export interface PrintBom {
  status: boolean;
  message: string;
  data: BomItem[];
}

export interface BomItem {
  unit: string;
  price: number;
  chemical: string;
  packing_priority_items: PackingItem[];
  total_quantity: number;
}

export interface PackingItem {
  brand: string;
  company: string;
  priority: number;
}
