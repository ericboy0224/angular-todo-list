import { TodoListService } from './../todo-list.service';

import { Todo } from './../todo.model';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-todo-comment',
    templateUrl: './todo-comment.component.html',
    styleUrls: ['./todo-comment.component.css']
})
export class TodoCommentComponent implements OnInit {
    @Input() todo: Todo = { title: '', comment: '', completed: false, editing: false, date: '' };
    newTitle: string = "";
    titleEditing = false;
    constructor(private render2: Renderer2, public todoListService: TodoListService) {
    }

    ngOnInit(): void {
    }

    change(): void {
        this.render2.selectRootElement('#comment').focus();
    }

    updateTodo(titlevalue: HTMLInputElement, commentvalue: HTMLTextAreaElement, datevalue: HTMLInputElement): void {
        this.todo.title = titlevalue.value;
        this.todo.comment = commentvalue.value;
        this.todo.date = datevalue.value || this.todo.date;
        this.todoListService.updateTodo(this.todo);
    }

    closeEdit(todo: Todo): void {
        todo.editing = false;
        todo.comment = todo.comment.trim().length > 0 ? todo.comment : 'Write some comments ...';
    }

}
