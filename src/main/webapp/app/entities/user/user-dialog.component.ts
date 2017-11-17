import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { User } from './user.model';
import { UserPopupService } from './user-popup.service';
import { UserService } from './user.service';
import { Project, ProjectService } from '../project';
import { Task, TaskService } from '../task';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-user-dialog',
    templateUrl: './user-dialog.component.html'
})
export class UserDialogComponent implements OnInit {

    user: User;
    isSaving: boolean;

    projects: Project[];

    tasks: Task[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userService: UserService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.taskService.query()
            .subscribe((res: ResponseWrapper) => { this.tasks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.user.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userService.update(this.user));
        } else {
            this.subscribeToSaveResponse(
                this.userService.create(this.user));
        }
    }

    private subscribeToSaveResponse(result: Observable<User>) {
        result.subscribe((res: User) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: User) {
        this.eventManager.broadcast({ name: 'userListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }

    trackTaskById(index: number, item: Task) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-user-popup',
    template: ''
})
export class UserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userPopupService: UserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userPopupService
                    .open(UserDialogComponent as Component, params['id']);
            } else {
                this.userPopupService
                    .open(UserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
