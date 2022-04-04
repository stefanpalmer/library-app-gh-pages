import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BookService } from '../shared/book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-anthology',
  templateUrl: './anthology.component.html',
  styleUrls: ['./anthology.component.css']
})

export class AnthologyComponent implements OnInit {
  id!: number;
  editMode = false;
  anthologyForm!: FormGroup;

  constructor(private route: ActivatedRoute, 
    private bookService: BookService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  getControls() {
    return (<FormArray>this.anthologyForm.get('stories')).controls;
  }

  onSubmit() {
    if (this.editMode) {
      this.bookService.updateBook(this.id, this.anthologyForm.value);
      this.router.navigate(['../..'], {relativeTo: this.route});
    } else {
      this.bookService.addBook(this.anthologyForm.value);
      this.router.navigate(['../library'], {relativeTo: this.route});
    }
  }

  onCancelNew() {
    this.router.navigate(['../start'], {relativeTo: this.route});
  }

  onCancelEdit() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }

  onAddStory() {
    (<FormArray>this.anthologyForm.get('stories')).push(
      new FormGroup({
        'title': new FormControl(null),
        'author': new FormControl(null)
      })
    );
  }

  onDeleteStory(index: number) {
    (<FormArray>this.anthologyForm.get('stories')).removeAt(index);
  }

  private initForm() {
    let anthologyTitle = '';
    let anthologyEditor = '';
    let anthologyPublisher = '';
    let anthologyYear = null;
    let anthologyPages = null;
    let anthologyIsbn = '';
    let anthologyStories = new FormArray([]);
    let anthologyReview = '';

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      anthologyTitle = book.title;
      anthologyEditor = book.author;
      anthologyPublisher = book.publisher;
      anthologyYear = book.year;
      anthologyPages = book.pages;
      anthologyIsbn = book.isbn;
      if (book['stories']) {
        for (let story of book.stories) {
          anthologyStories.push(
            new FormGroup ({
              'title': new FormControl(story.title),
              'author': new FormControl(story.author)
            })
          );
        }
      }
      anthologyReview = book.review;
    }

    this.anthologyForm = new FormGroup ({
      'title': new FormControl(anthologyTitle, Validators.required),
      'author': new FormControl(anthologyEditor, Validators.required),
      'publisher': new FormControl(anthologyPublisher),
      'year': new FormControl(anthologyYear, Validators.max(new Date().getFullYear())),
      'pages': new FormControl(anthologyPages, Validators.min(1)),
      'isbn': new FormControl(anthologyIsbn, Validators.pattern(/^\d{13}$/)),
      'stories': anthologyStories,
      'review': new FormControl(anthologyReview)
    });

  }
}
