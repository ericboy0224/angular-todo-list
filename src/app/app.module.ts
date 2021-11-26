import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCommentComponent } from './todo-list/todo-comment/todo-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent,
        TodoCommentComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
