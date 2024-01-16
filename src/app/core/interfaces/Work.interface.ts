import { AngularFireStorageReference } from "@angular/fire/compat/storage";

export interface WorkModel {
  company: string;
  role: string;
  desc: string[];
  date: DateField;
  logo?: string;
  chart_ref: any;
}


interface DateField {
  from: string,
  to: string,
  total_in_months: string
}
