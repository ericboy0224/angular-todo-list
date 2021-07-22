
import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() { }

  add(title: string, completed: boolean) {
    if (!title.trim()){
      return
    }

    this.list.push(new Todo(title, completed ));
    this.save();
  }

  //list is private

  getList(): Todo[] {
    return this.list;
  }

  remove(index: number): void {
    this.list.splice(index, 1);
    this.save();
  }

  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }
  toggleCompletion(index: number):void{
    this.list[index].toggleCompletion();
    this.save();
  }

  save(): void {
    const stringfied = JSON.stringify(this.list);
    localStorage.setItem("list", stringfied);
    console.log('working',stringfied);
  }

  load(): void {
    const listJSON = localStorage.getItem('list');
    console.log('load working!');
    if (listJSON !== null) {
      const listObj = JSON.parse(listJSON);
      for (let item of listObj) {
        this.list.push(new Todo(item.title, item.completed));
      }
    } else {
      this.list = [];
    }

  }


}