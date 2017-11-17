import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AuthorityComponent } from './authority.component';
import { AuthorityDetailComponent } from './authority-detail.component';
import { AuthorityPopupComponent } from './authority-dialog.component';
import { AuthorityDeletePopupComponent } from './authority-delete-dialog.component';

export const authorityRoute: Routes = [
    {
        path: 'authority',
        component: AuthorityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trackerrApp.authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'authority/:id',
        component: AuthorityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trackerrApp.authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const authorityPopupRoute: Routes = [
    {
        path: 'authority-new',
        component: AuthorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trackerrApp.authority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'authority/:id/edit',
        component: AuthorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trackerrApp.authority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'authority/:id/delete',
        component: AuthorityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trackerrApp.authority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
