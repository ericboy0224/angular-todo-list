import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() {
    const listJSON = localStorage.getItem('list');

    if (listJSON !== null) {
      const listObj = JSON.parse(listJSON);
      this.list = listObj.map((todo: { title: string, completed: boolean }) => {
        let listItem = new Todo(todo.title, todo.completed);
        return listItem
      })
    } else {
      this.list = [];
    }
  }
  ///////////// Local Storage ////////////////////
  save(): void {
    const stringfied = JSON.stringify(this.list);
    localStorage.setItem("list", stringfied);
    console.log('working', stringfied);
  }

  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }


  removeCompleted(): void {
    this.list = this.getWithCompleted(false);
  }

  toggleCompletion(todo: Todo): void {
    todo.toggleCompletion();
    this.save();
  }

  remove(todo: Todo): void {
    this.list.splice(this.list.indexOf(todo), 1);
    this.save();
  }

  add(title: string, completed: boolean) {
    this.list.push(new Todo(title, completed));
    this.save();
  }

  getList(): Todo[] {
    return this.list;
  }

}
