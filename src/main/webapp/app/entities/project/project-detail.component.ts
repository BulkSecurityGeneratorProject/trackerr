import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import {TaskService} from '../task/task.service';
import {Task} from '../task/task.model';

import {UserService} from '../user/user.service';
import {User} from '../user/user.model';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';

@Component({
    selector: 'jhi-project-detail',
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
    userService: UserService;

    project: Project;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentUser: User;
    onlyMyTasks: boolean;
    filteredTasks: Task[];
    canModifyy: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private taskService: TaskService,
        userService: UserService

    ) {
        this.currentUser = userService.findCurrentUser() ;

    }

    canModify(): boolean {
        let result: boolean;
        result = false;
        if ( this.project.users.some((e) => e.id === this.currentUser.id)  ) {
            result = true;
        }
        return result;

    }

    filterTasks(): Task[] {
        if ( this.onlyMyTasks) {
            this.filteredTasks = this.project.tasks
        } else {
            this.taskService.findForCurrUserAndProject(this.project.id).subscribe(
                (res: ResponseWrapper) => {
                    this.filteredTasks = res.json;
                }
            );
        }

        return this.filteredTasks;
    }

    createNewTask(): Task {
        this.filteredTasks = this.project.tasks;
        let task  = new Task();
        task.project = this.project;
        let userArray: User[];

        console.log(this.currentUser);
        userArray = [this.userService.findCurrentUser()];

        task.users =  userArray ;

        task.taskName = this.project.projectName + ' ' + this.currentUser.login +  ' task ' + new Date()  ;
        task.taskDescr = this.project.projectName + ' ' + this.currentUser.login +  ' task ' + new Date() ;
        this.taskService.create(task).subscribe((taskk) => task = taskk );
        this.project.tasks.unshift(task);
        this.filteredTasks.unshift(task);
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.ngOnInit();
        return task;
    }

    ngOnInit() {
        this.onlyMyTasks = false;
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.currentUser = this.userService.findCurrentUser();
        console.log(this.userService.currentUser);
        this.filteredTasks = this.project.tasks;

        this.registerChangeInProjects();
        this.canModifyy = this.canModify()
    }

    load(id) {
        this.projectService.find(id).subscribe((project) => {
            this.project = project;
        });

        this.currentUser = this.userService.findCurrentUser();
        this.filteredTasks = this.project.tasks;

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
