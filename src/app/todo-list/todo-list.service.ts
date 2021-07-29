import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
@Injectable({
    providedIn: 'root'
})
export class TodoListService {
    private list: Todo[] = [];
    constructor() {
        const listJSON = localStorage.getItem('list');

        if (listJSON == null) {
            return
        }
        this.list = JSON.parse(listJSON).map((todo: { title: string, comment: string, completed: boolean, date: string }) => {
            return {title: todo.title,comment: todo.comment, completed: todo.completed, date:todo.date}
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
        this.list.push(new Todo(todo ,new Date().toLocaleDateString()));
        this.update();
    }

    getList(): Todo[] {
        return this.list;
    }
}
