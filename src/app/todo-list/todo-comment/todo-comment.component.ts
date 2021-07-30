import { Component, Input, OnInit, Output, EventEmitter, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo.model';
@Component({
    selector: 'app-todo-comment',
    templateUrl: './todo-comment.component.html',
    styleUrls: ['./todo-comment.component.css']
})
export class TodoCommentComponent implements OnInit {
    @Input() todo: Todo = { title: '', comment: '', completed: false, editing: false, date: '' };
    newTitle: string = "";
    titleEditing = false;

    @Output() edited = new EventEmitter<{ newTitle: string, newComment: string }>();

    constructor(public render2: Renderer2) {
    }


    ngOnInit(): void {
    }


    change(): void {
        this.render2.selectRootElement('#comment').focus();
    }
    editTodo(titlevalue: HTMLInputElement, commentvalue: HTMLTextAreaElement): void {

        this.edited.emit({
            newTitle: titlevalue.value,
            newComment: commentvalue.value
        })
    }

    closeEdit(todo: Todo): void {
        todo.editing = false;
        todo.comment = todo.comment.trim().length > 0 ? todo.comment : 'Write some comments...';
    }

}
