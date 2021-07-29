import { Component, Input, OnInit, Output, EventEmitter,ElementRef, ViewChild } from '@angular/core';
import { Todo } from '../todo.model';
@Component({
    selector: 'app-todo-comment',
    templateUrl: './todo-comment.component.html',
    styleUrls: ['./todo-comment.component.css']
})
export class TodoCommentComponent implements OnInit {
    @Input() todo: Todo = { title: '', comment: '', completed: false, editing: false, date: '' };
    newTitle: string = "";
    titleEditing= false;

    @Output() edited = new EventEmitter<{newTitle: string,newComment: string }>();

    @ViewChild('titlevalue',{static:false})
    set titlevalue(element: ElementRef<HTMLInputElement>){
        if(element){
            element.nativeElement.focus();
        }
    }
    constructor() { }


    ngOnInit(): void {
    }
    titleEdited(title:string){
        this.todo.title = title;
        this.titleEditing = false;

    }
    editTitle(){
        this.titleEditing = true;
    }

    // editTodo(newComment: string): void{
    //     const comment = newComment.trim();
    //     this.todo.comment = comment.length >0 ? comment :'write some comments...';
    //     this.todo.editing = false;
    // }:
    editTodo(titlevalue: HTMLInputElement,commentvalue: HTMLTextAreaElement): void {

        this.edited.emit({
            newTitle: titlevalue.value,
            newComment:commentvalue.value
        })
    }

    closeEdit(todo: Todo): void{
    todo.editing = false;
    }

}
