import { TodoListService } from './todo-list.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo: string = "";
  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.load();
  }

  addTodo(): void {
    if (this.todo) {
      this.todoListService.add(this.todo);
      this.todo = ''
    }
  }

  getList(): Todo[] {
    return this.todoListService.getList();
  }

  remove(index: number): void {
    this.todoListService.remove(index);
  }

  edit(todo: Todo): void {
    todo.editable = true;
  }

  update(todo: Todo, newTitle: string): void {

    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();

    if (title) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
  }

  toggleCompletion(index: number): void{
    this.todoListService.toggleCompletion(index);

  }

  cancelEditing(todo: Todo): void{
    todo.editable = false;
  }
  getRemainingList(): Todo[]{
    return this.todoListService.getWithCompleted(false);
  }

  // save(){
  //   this.todoListService.save();
  // }
  load(){
    this.todoListService.load();
  }


}
