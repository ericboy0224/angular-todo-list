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
        const listObj = JSON.parse(listJSON);
        this.list = listObj.map((todo: { _title: string, completed: boolean }) => {
            const pushList = new Todo(todo._title);
            pushList.completed = todo.completed;
            return pushList;
        })

    }
    update(): void {
        const listJSON = JSON.stringify(this.list);
        localStorage.setItem('list', listJSON);
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
        this.list.push(new Todo(todo));
        this.update();
    }

    getList(): Todo[] {
        return this.list;
    }
}
