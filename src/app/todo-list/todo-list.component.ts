import { TodoListService } from './todo-list.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
    searchItem: string = '';
    constructor(private todoListService: TodoListService) { }

    @ViewChild('edittodo',{static: false})
    set edittodo(element: ElementRef<HTMLInputElement>){
        if(element){
            element.nativeElement.focus()
        }
    }
    ngOnInit(): void {
    }
    update(){
        this.todoListService.update();
    }
    searchList(): Todo[]{
        return this.todoListService.searchList(this.searchItem);
    }

    changeMode(){
        this.searchMode = !this.searchMode;
    }
    checkStatus(status: number): boolean{
        return this.status === status;
    }

    setStatus(status: number): void{
        this.status = status;
        this.searchMode = false;
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
    }

    getCompletedList(): Todo[] {
        return this.todoListService.getWithCompleted(true);
    }

    getRemainingList(): Todo[] {
        return this.todoListService.getWithCompleted(false);
    }

    closeEdit(todo: Todo) {
        todo.editing = false;
    }

    updateTodo(todo: Todo, newTitle: string) {
        if (!todo.editing) {
            return;
        }
        const title = newTitle.trim();
        if (title.length > 0) {
            todo.title = title;
            todo.editing = false;
        } else {
            this.removeTodo(todo);
        }
        this.update();
    }

    editing(todo: Todo): void {
        todo.editing = true;
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

            default:
                list = this.todoListService.getList();
                break;
        }

        return list;
    }

    getAllList(): Todo[]{
        return this.todoListService.getList();
    }
}
