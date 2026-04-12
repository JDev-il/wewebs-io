export interface WorkModel {
  company: string;
  role: string;
  desc: string[];
  date: DateField;
  logo?: string;
  chart_ref: any;
}

export interface DateField {
  from: string,
  to: string,
  total_in_months: string
}
