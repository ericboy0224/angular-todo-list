export class Todo {
    // 記錄代辦事項與完成、編輯模式
    completed: boolean;
    editing: boolean;
    date: any;
    private _title: string;

    //getter
    get title(){
        return this._title;
    }
    //setter
    set title(title: string){
        this._title = title;
    }

    constructor(title: string) {
        this._title = title;
        this.completed = false;
        this.editing = false;
        this.date = new Date().toLocaleDateString();

    }
}
