import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { NovelComponent } from './novel/novel.component';
import { AnthologyComponent } from './anthology/anthology.component';
import { LibraryComponent } from './library/library.component';
import { DetailsComponent } from './details/details.component';
import { AppRoutingModule } from './app-routing.module';
import { SubIsbnPipe } from './substr-isbn.pipe';
import { SubReviewPipe } from './substr-review.pipe';
import { BookService } from './shared/book.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    HeaderComponent,
    NovelComponent,
    AnthologyComponent,
    LibraryComponent,
    DetailsComponent,
    SubIsbnPipe,
    SubReviewPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
