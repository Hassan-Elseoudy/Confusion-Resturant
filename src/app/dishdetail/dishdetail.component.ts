import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { baseURL } from '../shared/baseurl';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  baseURL = baseURL;
  
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  comment: Comment = {
    rating: 5,
    comment: '',
    author: '',
    date: '',
  };

  feedbackForm: FormGroup;
  @ViewChild('fform') feedbackFormDirective; // Used to reset



  formErrors = { // Which parts of forms need to be defined to contain errors
    author: '',
    comment: '',
  };

  validationMessages = { // Validation Messages for each errorForm
    author: {
      required: 'Author name is required',
      minlength: 'Author name must be at least 2 chars long',
    },
    comment: {
      required: 'Comment is required',
      minlength: 'Comment must be at least 2 chars long'
    }
  };



  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    this.createForm();
  }

  // Used to create a comment feedback form
  createForm() {
    this.feedbackForm = this.fb.group({
      comment: ['', Validators.minLength(2)],
      author: ['', Validators.minLength(2)],
    });
    this.feedbackForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  // Deal with any change values
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.invalid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // Action happens when we submit the comment
  onSubmit() {

    this.comment.comment = this.feedbackForm.value.comment;
    this.comment.author = this.feedbackForm.value.author;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment); // Adding a new comment

    // Resetting the Feedback form
    this.feedbackForm.reset({
      comment: '',
      author: '',
    });

    // Resetting the comment.
    this.comment = {
      rating: 5,
      comment: '',
      author: '',
      date: '',
    };

    this.feedbackFormDirective.resetForm();
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }


}
