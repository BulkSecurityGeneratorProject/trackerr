import { BaseEntity, User } from './../../shared';
import {Task} from '../task/task.model';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public projectDescription?: string,
        public projectName?: string,
        public tasks?: Task[],
        public users?: User[],
    ) {
    }
}
