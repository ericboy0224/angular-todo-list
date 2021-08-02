import { Todo } from './../todo.model';
import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class TodoCommentService {
    edited = new EventEmitter<{ todo: Todo, newTitle: string, newComment: string, newDate: string }>();
    constructor() { }

}
