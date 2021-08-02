import { TodoCommentService } from './todo-comment/todo-comment.service';
import { TodoListService } from './todo-list.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type';
@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    todo: string = '';
    todoStatusType = TodoStatusType;
    private status = TodoStatusType.All;
    searchMode: boolean = false;


    // searchItem: string = '';
    constructor(private todoListService: TodoListService, private todoCommentService: TodoCommentService) {
        this.todoCommentService.edited.subscribe((editedTodo: { todo: Todo, newTitle: string, newComment: string, newDate: string }) => {
            const title = editedTodo.newTitle.trim();
            const comment = editedTodo.newComment.trim();
            const date = editedTodo.newDate.split('-').join('/');
            if (title.length > 0) {
                editedTodo.todo.title = title;
                editedTodo.todo.editing = false;
                editedTodo.todo.comment = comment.length > 0 ? comment : 'Write some comments ...';
                editedTodo.todo.date = date ? date : editedTodo.todo.date;
            } else {
                this.removeTodo(editedTodo.todo);
            }
            this.update();

            console.log(title, comment, date);
        })
    }

    @ViewChild('edittitle', { static: false })
    set edittitle(element: ElementRef<HTMLInputElement>) {
        if (element) {
            element.nativeElement.focus()
        }
    }

    ngOnInit(): void {
    }
    update() {
        this.todoListService.update();
    }
    // displayedMode(): Todo[] {
    //     return this.searchMode ? this.todoListService.searchList(this.todo) : this.getList();
    // }
    getSearchList() {
        return this.todoListService.searchList(this.todo);
    }

    changeMode() {
        this.searchMode = !this.searchMode;
    }

    checkStatus(status: number): boolean {
        return this.status === status;
    }

    setStatus(status: number, searchMode: boolean): void {
        this.status = status;
        this.searchMode = searchMode
    }

    removeCompleted(): void {
        this.todoListService.removeCompleted();
    }

    allCompleted(): boolean {
        return this.getList().length === this.getCompletedList().length;
    }

    setAllTo(completed: boolean): void {
        this.getList().forEach((todo) => {
            todo.completed = completed;
        })
        this.update();
    }

    getCompletedList(): Todo[] {
        return this.todoListService.getWithCompleted(true);
    }

    getRemainingList(): Todo[] {
        return this.todoListService.getWithCompleted(false);
    }

    closeEdit(todo: Todo) {
        todo.editing = false;
        todo.comment = todo.comment.trim().length > 0 ? todo.comment : 'Write some comments ...';
    }

    editing(todo: Todo): void {
        todo.editing = true;
        if (todo.comment === 'Write some comments ...') {
            todo.comment = '';
        }
    }

    toggleCompletion(todo: Todo) {
        todo.completed = !todo.completed;
        this.update();
    }

    removeTodo(todo: Todo): void {
        this.todoListService.removeTodo(todo);
    }

    addTodo(): void {
        if (!this.todo.trim()) {
            return;
        }
        this.todoListService.addTodo(this.todo);
        this.todo = '';
    }

    getList(): Todo[] {
        let list: Todo[] = [];

        switch (this.status) {

            case TodoStatusType.Active:
                list = this.getRemainingList();
                break;

            case TodoStatusType.Completed:
                list = this.getCompletedList();
                break;

            case TodoStatusType.Search:
                list = this.getSearchList();
                break;


            default:
                list = this.todoListService.getList();
                break;
        }

        return list;
    }

    getAllList(): Todo[] {
        return this.todoListService.getList();
    }
}
