import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContactForm, ContactFormClass } from '../interfaces/Forms.interface';
import { UserDetailsModel } from '../interfaces/Users.interface';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  private form!: ContactForm;

  constructor() {
    this.form = this.createNewForm;
  }

  get getForm(): ContactForm {
    return this.form;
  }

  public updateFormStatus(formData: UserDetailsModel) {
    // Todo:: make sure formData is usable for cache and / or refills if the same customer - hence change only extra e.g.
    this.form.reset();
  }

  private get createNewForm(): ContactForm {
    return new ContactFormClass({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)]),
      extra: new FormControl('')
    });
  }


}
