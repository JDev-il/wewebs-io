import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'Contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../styles/component.core.scss']
})
export class ContactComponent {

  public messageForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]]
  })

  constructor(public fb: FormBuilder, private apiService: ApiService) { }

  public sendForm(formData: any) {
    this.apiService.responseConfirmation(formData);
  }
}
