import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Book } from "./book.model";
import { Story } from "../anthology/story.model";

@Injectable()
export class BookService {
    booksChanged = new Subject<Book[]>();

    private books: Book[] = [

        new Book (
            'The Forever War',
            'Joe Haldeman',
            'St. Martin Griffin',
            1974,
            202,
            'Forever War Series',
            1,
            [],
            '9780312536633',
            "After the third or fourth read, this is still as fabulous of a story as it was the first time I read it many years ago."
        ),

        new Book (
            'Walter M. Miller Collection',
            'Walter M. Miller',
            'Gollancz',
            1980,
            661,
            '',
            null,
            [
              new Story('The Will', 'Walter M. Miller'),
              new Story('Anybody Else Like Me?', 'Walter M. Miller'),
              new Story('Crucifixus Ethiam', 'Walter M. Miller'),
              new Story('Dark Benediction', 'Walter M. Miller'),
              new Story('I, Dreamer', 'Walter M. Miller'),
              new Story('Dumb Waiter', 'Walter M. Miller'),
              new Story('Blood Bank', 'Walter M. Miller'),
              new Story('Big Joe and the Nth Generation', 'Walter M. Miller'),
              new Story('The Big Hunger', 'Walter M. Miller'),
              new Story('Conditionally Human', 'Walter M. Miller'),
            ],
            '9780575079779',
            "Walter Miller's fiction has long been a favorite of mine. Dark Benediction is not just one of my favorite science fiction stories, but one of my favorite works altogether."
          ),
      
          new Book (
            'The Left Hand of Darkness',
            'Ursula K. Le Guin',
            'Ace Books',
            1959,
            359,
            'Hainish Cycle',
            6,
            [],
            '9780441478125',
            "This book is a classic! It is science fiction that addresses the social consequences of contact between people from different planets rather than fixating on technology and the things that can go wrong."
          ),
      
          new Book (
            'The Island of Doctor Moreau',
            'H. G. Wells',
            'Dover Publications',
            1896,
            604,
            '',
            null,
            [],
            '9780486290270',
            "The mad scientist has been with us since the early 1800s. And while H.G. Wells didn't create the mad scientist stereotype, he certainly gave it a boost in his harrowing novella beast-men forced to live like humans, a crazy scientist carrying out mad plans, and a bland Englishman stuck in the middle of it."
          )
    ];

    getBooks() {
        return this.books.slice();
    }

    getBook(index: number) {
        return this.books[index];
    }

    addBook(book: Book) {
        this.books.push(book);
        this.booksChanged.next(this.books.slice());
    }

    updateBook(index: number, newBook: Book) {
        this.books[index] = newBook;
        this.booksChanged.next(this.books.slice());
    }

    deleteBook(index: number) {
        this.books.splice(index, 1);
        this.booksChanged.next(this.books.slice());
    }


}