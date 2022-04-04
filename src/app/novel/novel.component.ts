import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../shared/book.model';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-novel',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {

  subscription!: Subscription;
  editedBook!: Book;
  editedNumberIndex!: number;
  editMode = false;
  novelForm!: FormGroup;

  constructor(private route: ActivatedRoute, 
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.editedNumberIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.bookService.updateBook(this.editedNumberIndex, this.novelForm.value);
      this.router.navigate(['../..'], {relativeTo: this.route});
    } else {
      this.bookService.addBook(this.novelForm.value);
      this.router.navigate(['../library'], {relativeTo: this.route});
    }
  }

  onCancelNew() {
    this.router.navigate(['../start'], {relativeTo: this.route});
  }

  onCancelEdit() {
    this.router.navigate(['../..'], {relativeTo: this.route});
  }

  private initForm() {
    let novelTitle = '';
    let novelAuthor = '';
    let novelPublisher = '';
    let novelYear = null;
    let novelPages = null;
    let novelSeries = '';
    let novelSeriesNum = null;
    let novelStories = new FormArray([]);
    let novelIsbn = '';
    let novelReview = '';

    if (this.editMode) {
      const book = this.bookService.getBook(this.editedNumberIndex);
      novelTitle = book.title;
      novelAuthor = book.author;
      novelPublisher = book.publisher;
      novelYear = book.year;
      novelPages = book.pages;
      novelSeries = book.series;
      novelSeriesNum = book.seriesnum;
      novelStories;
      novelIsbn = book.isbn;
      novelReview = book.review;
    }
    
    this.novelForm = new FormGroup({
      'title': new FormControl(novelTitle, Validators.required),
      'author': new FormControl(novelAuthor, Validators.required),
      'publisher': new FormControl(novelPublisher),
      'year': new FormControl(novelYear, Validators.max(new Date().getFullYear())),
      'pages': new FormControl(novelPages, Validators.min(1)),
      'series': new FormControl(novelSeries),
      'seriesnum': new FormControl(novelSeriesNum),
      'stories': novelStories,
      'isbn': new FormControl(novelIsbn, Validators.pattern(/^\d{13}$/)),
      'review': new FormControl(novelReview)
    })
    
  }
}
