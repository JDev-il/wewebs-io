import { FormGroup, FormControl, ValidatorFn } from "@angular/forms";
import { UserDetailsModel } from "./Users.interface";

export class ContactFormClass<T> extends FormGroup {
  constructor(controls: { [V in keyof T]: FormControl }, validatorOrOpts?: ValidatorFn) {
    super(controls, validatorOrOpts)
  }
}

export type ContactForm = ContactFormClass<UserDetailsModel>;
