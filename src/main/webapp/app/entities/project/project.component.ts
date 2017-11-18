import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager,  JhiAlertService } from 'ng-jhipster';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import {  Account,  Principal, ResponseWrapper } from '../../shared';
import {UserService} from '../user/user.service';
import {User} from '../user/user.model';

@Component({
    selector: 'jhi-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {
    projects: Project[];
    currentAccount: Account;
    eventSubscriber: Subscription;
    canCreateProjects: boolean;
    private currentUser: User;

    constructor(
        private projectService: ProjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private userService: UserService
    ) {
    }

    loadAll() {
        this.projectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.projects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.canCreateProjects = false;
            console.log(this.currentAccount.authorities);
            // this.canCreateProjects = this.currentAccount.authorities.some((auth) => auth === 'Manager');
            // let i = 0;
            // for ( i < this.currentUser.authorities.length; i++; ) {
            //     if (this.currentUser.authorities[i] === 'Manager' ) {this.canCreateProjects = true;  }
            // }
            // console.log(this.currentUser.authorities.some((auth) => auth === 'Manager'));
        });
        this.registerChangeInProjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Project) {
        return item.id;
    }
    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
