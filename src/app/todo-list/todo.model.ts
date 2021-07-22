

export class Todo {
  // 記錄代辦事項與完成、編輯模式
  private title = '';
  private completed= false;
  private editMode = false;
  constructor(title: string, completed: boolean ){
    this.title = title || ''; //prevent falsy value
    this.completed = completed;
  }

  // getter

  get done(): boolean{
    return this.completed;
  }
  getTitle(){
    return this.title;
  }
  //切換
  toggleCompletion(): void{
    this.completed = !this.completed;
  }

  get editing(): boolean{
    return this.editMode;
  }

  //setter
  set editable(bl: boolean){
    this.editMode= bl;
  }

  setTitle(title: string): void{
    this.title = title;
  }

  setCompleted():void{
    this.completed = !this.completed;
  }

}
