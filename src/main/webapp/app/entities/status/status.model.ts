import { BaseEntity } from './../../shared';
import {Task} from '../task/task.model';

export class Status implements BaseEntity {
    constructor(
        public id?: number,
        public statusName?: string,
        public tasks?: Task[],
    ) {
    }
}
