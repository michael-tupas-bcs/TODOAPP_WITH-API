import { Task } from './task.models';

export class Column{
    constructor(public name: string, public columns: Task[]) {}
}