

import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private list: Todo[] = [];

  constructor() { }
///////////////// Add and Remove //////////////
  add(title: string, completed: boolean) {
    // if (!title.trim()){
    //   return
    // }

    this.list.push(new Todo(title, completed ));
    this.save();
  }

  remove(index: number): void {
    this.list.splice(index, 1);
    this.save();
  }

///////////// Get List Data //////////////

  getList(): Todo[] {
    return this.list;
  }



  //////////////// Get Completed //////////
  getWithCompleted(completed: boolean): Todo[] {
    return this.list.filter(todo => todo.done === completed);
  }

  //////////////// Toggle Completion ////////
  toggleCompletion(index: number):void{
    this.list[index].toggleCompletion();
    this.save();
  }

  /////////////// Remove Completion //////////
  removeCompleted(): void{
    this.list = this.getWithCompleted(false);
  }



///////////// Local Storage ////////////////////
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
