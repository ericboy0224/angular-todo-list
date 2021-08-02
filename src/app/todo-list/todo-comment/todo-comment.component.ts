import { TodoListService } from './../todo-list.service';

import { Todo } from './../todo.model';
import { Component, Input, OnInit, Renderer2, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-todo-comment',
    templateUrl: './todo-comment.component.html',
    styleUrls: ['./todo-comment.component.css']
})
export class TodoCommentComponent implements OnInit {
    @Input() todo: Todo = { title: '', comment: '', completed: false, editing: false, date: '' };
    newTitle: string = "";
    titleEditing = false;
    constructor(public render2: Renderer2, public todoListService :TodoListService) {
    }

    ngOnInit(): void {
    }

    change(): void {
        this.render2.selectRootElement('#comment').focus();
    }

    editTodo(titlevalue: HTMLInputElement, commentvalue: HTMLTextAreaElement, datevalue: HTMLInputElement): void {
        this.todoListService.edited.emit({ todo: this.todo, newTitle: titlevalue.value, newComment: commentvalue.value, newDate: datevalue.value })
    }

    closeEdit(todo: Todo): void {
        todo.editing = false;
        todo.comment = todo.comment.trim().length > 0 ? todo.comment : 'Write some comments ...';
    }

}
