import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Task } from './task.model';
import { TaskService } from './task.service';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';
import {Comment} from '../comment/comment.model';
import {Observable} from 'rxjs/Observable';
import {CommentService} from '../comment/comment.service';

@Component({
    selector: 'jhi-task-detail',
    templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit, OnDestroy {

    task: Task;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private currentUser: User;

    constructor(
        private eventManager: JhiEventManager,
        private taskService: TaskService,
        private route: ActivatedRoute,
        private userService: UserService,
        private commentService: CommentService,

    ) {
    }

    createNewComment(): Comment {
        this.registerChangeInTasks();

        let comment  = new Comment();
        comment.task = this.task;

        console.log(this.currentUser);

        comment.user = this.currentUser;

        comment.comment = this.task.taskName + ' ' + this.currentUser.login +  ' comment ' + new Date()  ;
        this.commentService.create(comment).subscribe((taskk) => comment = taskk );
        this.task.comments.unshift(comment);
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTasks();

        return comment;
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTasks();
    }

    load(id) {
        this.taskService.find(id).subscribe((task) => {
            this.task = task;
        });

        const observUser: Observable<User> = this.userService.findCurrentUser();
        observUser.subscribe((val) => {
            console.log(val);
            this.currentUser = val ;
        } );
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taskListModification',
            (response) => this.load(this.task.id)
        );
    }
}
