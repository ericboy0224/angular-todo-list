import { TodoListService } from './todo-list.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo: string = "";
  inputState: boolean = true;
  //代辦事項
  todoStatusType =TodoStatusType;

  //目前
  private status = TodoStatusType.All;

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.load();
  }

  addTodo(): void {
    if (!this.todo.trim()) {
      return;
    }
    this.todoListService.add(this.todo, false);
    this.todo = '';
  }

  getList(): Todo[] {
    let list: Todo[] = [];

    switch(this.status){

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

  allCompleted(): boolean{
    return this.getAllList.length === this.getCompletedList.length;
  }
  setAllTo(completed: boolean): void{
    this.getAllList().forEach((todo)=>{
      todo.setCompleted(completed);
    })
  }



  remove(index: number): void {
    this.todoListService.remove(index);
  }

  edit(todo: Todo): void {
    todo.editable = true;
    this.inputState = false
  }

  update(todo: Todo, newTitle: string): void {

    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();

    if (title && title.trim()) {
      todo.setTitle(title);
      todo.editable = false;
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }
    this.inputState = true;
    this.save();
  }

  toggleCompletion(index: number): void {
    this.todoListService.toggleCompletion(index);

  }

  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }
  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }
///////// 移除完成事項 ////////////
  removeCompleted(): void{
    this.todoListService.removeCompleted();
  }


  //////////取得代辦事項////////////
  getCompletedList(): Todo[]{
    return this.todoListService.getWithCompleted(true);
  }
  //////////設定狀態////////////
  setStatus(status: number): void{
    this.status = status;
  }

  //////////檢查目前狀態////////////
  checkStatus(status: number): boolean{
    return this.status === status;
  }



  ///////////// Local Storage //////////

  save() {
    this.todoListService.save();
  }
  load() {
    this.todoListService.load();
  }



}
