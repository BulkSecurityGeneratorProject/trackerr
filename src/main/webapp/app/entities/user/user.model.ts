import { BaseEntity } from './../../shared';
import {Project} from '../project/project.model';
import {Task} from '../task/task.model';
import {Comment} from '../comment/comment.model';

export class User implements BaseEntity {
    constructor(
        public id?: number,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public imageUrl?: string,
        public activated?: boolean,
        public langKey?: string,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public projects?: Project[],
        public tasks?: Task[],
        public comments?: Comment[],
        public authorities?: string[]

    ) {
        this.activated = false;
    }
}
