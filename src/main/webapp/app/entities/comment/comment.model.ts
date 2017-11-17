import { BaseEntity, User } from './../../shared';
import {Task} from '../task/task.model';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public comment?: string,
        public commDate?: any,
        public user?: User,
        public task?: Task,
    ) {
    }
}
