import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { NovelComponent } from './novel/novel.component';
import { AnthologyComponent } from './anthology/anthology.component';
import { LibraryComponent } from './library/library.component';
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'start', component: StartComponent },
    { path: 'novel', component: NovelComponent },
    { path: 'anthology', component: AnthologyComponent },
    { path: 'library/:id/edit-novel', component: NovelComponent },
    { path: 'library/:id/edit-anthology', component: AnthologyComponent },
    { path: 'library/:id/details', component: DetailsComponent },
    { path: 'library', component: LibraryComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
    
}