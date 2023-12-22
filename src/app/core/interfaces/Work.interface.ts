import { AngularFireStorageReference } from "@angular/fire/compat/storage";

export interface WorkModel {
  company: string;
  role: string;
  desc: string[];
  date: {from: string, to: string, total_in_months: string};
  logo?: string;
  chart_ref: any;
}
