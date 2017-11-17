import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import {TaskService} from '../task/task.service';
import {Task} from '../task/task.model';
import {UserRouteAccessService} from '../../shared/auth/user-route-access-service';
import {Principal} from '../../shared/auth/principal.service';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'jhi-project-detail',
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

    project: Project;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
private currentUser: User;

    constructor(
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private userService: UserService,

    ) {
    }




    createNewTask(): Task {
        this.registerChangeInProjects();

        let task  = new Task();
        task.project = this.project;
        let userArray: User[];

        console.log(this.currentUser);
        userArray = [this.currentUser];

        task.users =  userArray ;

        task.taskName = this.project.projectName + ' ' + this.currentUser.login +  ' task ' + new Date()  ;
        task.taskDescr = this.project.projectName + ' ' + this.currentUser.login +  ' task ' + new Date() ;
         this.taskService.create(task).subscribe((taskk) => task = taskk );
         this.project.tasks.unshift(task);
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjects();

        return task;
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjects();

        const observUser: Observable<User> = this.userService.findCurrentUser();
        observUser.subscribe((val) => {
            console.log(val);
            this.currentUser = val ;
        } );

    }

    load(id) {
        this.projectService.find(id).subscribe((project) => {
            this.project = project;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectListModification',
            (response) => this.load(this.project.id)
        );
    }
}
