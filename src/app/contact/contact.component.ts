import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  feedbackForm: FormGroup; // Form group can be built but FormBuilder
  feedback: Feedback; // Feedback is the value of FormGroup
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective; // Used to reset

  formErrors = { // Which parts of forms need to be defined to contain errors
    firstName: '',
    lastName: '',
    telNum: '',
    email: ''
  };

  validationMessages = { // Validation Messages for each errorForm
    firstName: {
      required: 'first name is required',
      minlength: 'First name must be at least 2 chars long',
      maxlength: 'First name cannot be more than 25 chars long'
    },
    lastName: {
      required: 'Last name is required',
      minlength: 'Last name must be at least 2 chars long',
      maxlength: 'Last name cannot be more than 25 chars long'
    },
    telNum: {
      required: 'Tel number is required',
      pattern: 'Only numbers',
    },
    email: {
      required: 'email is required',
      pattern: 'Email is not valid',

    }
  };

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(25)],
      lastName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(25)],
      telNum: [0, Validators.required, Validators.pattern],
      email: ['', Validators.required, Validators.email],
      agree: [false, Validators.required],
      contactType: ['None', Validators.required],
      message: ['', Validators.required]
    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged()
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      telNum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
