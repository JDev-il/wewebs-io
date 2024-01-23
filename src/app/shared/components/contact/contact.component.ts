import { Component } from '@angular/core';
import { UnSubscriber } from 'src/app/core/abstracts/UnSubscriber';
import { ContactForm } from 'src/app/core/interfaces/Forms.interface';
import { UserDetailsModel } from 'src/app/core/interfaces/Users.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { FormUtilsService } from 'src/app/core/services/formutils.service';


@Component({
  selector: 'Contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../styles/component.core.scss'],
})
export class ContactComponent extends UnSubscriber {

  public isFormValid: boolean = false;

  constructor(private apiService: ApiService, private formUtilsService: FormUtilsService) {
    super();
    super.ngOnDestroy();
  }

  get contactForm(): ContactForm{
    return this.formUtilsService.getForm;
  }

  public sendForm(formData: UserDetailsModel) {
    this.isFormValid = true;
    this.formUtilsService.updateFormStatus(formData);
    this.apiService.responseConfirmation(formData);
  }
}
