import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NgIf } from '@angular/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import {  Account, LoginModalService , ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import {UserService} from '../user/user.service';

@Component({
    selector: 'jhi-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {
    projects: Project[];
    currentAccount: Account;
    eventSubscriber: Subscription;
    canCreateProjects: boolean;
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
            this.canCreateProjects = this.currentAccount.authorities.some((auth) => auth === 'Manager');
            let i = 0;
            for ( i < this.currentAccount.authorities.length; i++; ) {
                if (this.currentAccount.authorities[i] === 'Manager' ) {this.canCreateProjects = true;  }
            }
            console.log(this.currentAccount.authorities.some((auth) => auth === 'Manager'));
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
