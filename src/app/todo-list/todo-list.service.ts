import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from './todo.model';
@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    private list: Todo[] = [];

    // Emit Edited Value
    edited = new EventEmitter<Todo>();

    constructor() {
        // Normalization
        const listJSON = localStorage.getItem('list');

        if (listJSON == null) {
            return
        }
        this.list = JSON.parse(listJSON).map((todo: { title: string, comment: string, completed: boolean, date: string }) => {
            return { title: todo.title, comment: todo.comment, completed: todo.completed, date: todo.date }
        })

        //Update Edited Value
        this.edited.subscribe((todo: Todo) => {
            const title = todo.title.trim()
            const comment = todo.comment.trim();
            const date = todo.date.split('-').join('/');
            if (title.length > 0) {
                todo.title = title;
                todo.editing = false;
                todo.comment = comment || 'Write some comments ...';
                todo.date = date;
            } else {
                this.removeTodo(todo);
            }
            this.update();

            console.log(title, comment, date);
        })

    }

    update(): void {
        const listJSON = JSON.stringify(this.list);
        localStorage.setItem('list', listJSON);
    }

    searchList(str: string): Todo[] {
        const searchResult = this.list.filter(todo => todo.title.includes(str) || todo.date.includes(str));
        return searchResult;
    }

    removeCompleted() {
        this.list = this.getWithCompleted(false);
        this.update();
    }
    getWithCompleted(completed: boolean): Todo[] {
        return this.list.filter(todo => todo.completed === completed);
    }
    removeTodo(todo: Todo): void {
        this.list.splice(this.list.indexOf(todo), 1);
        this.update();
    }

    addTodo(todo: string): void {
        this.list.push(new Todo(todo, new Date().toLocaleDateString()));
        this.update();
    }

    getList(): Todo[] {
        return this.list;
    }
}
