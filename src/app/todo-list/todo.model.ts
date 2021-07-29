import { Placeholder } from "@angular/compiler/src/i18n/i18n_ast";

export class Todo {
    // 記錄代辦事項與完成、編輯模式
    completed: boolean;
    comment: string;
    editing: boolean;
    date: string;
    title: string;


    // //getter
    // get title() {
    //     return this._title;
    // }
    // //setter
    // set title(title: string) {
    //     this._title = title;
    // }

    constructor(title: string, date: string) {
        this.title = title;
        this.comment = 'Write some comments ...'
        this.completed = false;
        this.editing = false;
        this.date = date;


    }
}
