import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit, OnDestroy {

  book!: Book;
  books!: Book[];
  id!: number;
  subscription!: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.subscription = this.bookService.booksChanged.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.books = this.bookService.getBooks();
  }

  onDeleteBook(index: number) {
    if(confirm("Are you sure you want to delete " + this.bookService.getBook(index).title + "?")) {
      this.bookService.deleteBook(index);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
