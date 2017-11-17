import { BaseEntity, User } from './../../shared';
import {Project} from '../project/project.model';
import {Status} from '../status/status.model';
import {Comment} from '../comment/comment.model';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public taskName?: string,
        public taskDescr?: string,
        public comments?: Comment[],
        public status?: Status,
        public project?: Project,
        public users?: User[],
    ) {
    }
}
