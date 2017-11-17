import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrackerrSharedModule } from '../../shared';
import {
    AuthorityService,
    AuthorityPopupService,
    AuthorityComponent,
    AuthorityDetailComponent,
    AuthorityDialogComponent,
    AuthorityPopupComponent,
    AuthorityDeletePopupComponent,
    AuthorityDeleteDialogComponent,
    authorityRoute,
    authorityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...authorityRoute,
    ...authorityPopupRoute,
];

@NgModule({
    imports: [
        TrackerrSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AuthorityComponent,
        AuthorityDetailComponent,
        AuthorityDialogComponent,
        AuthorityDeleteDialogComponent,
        AuthorityPopupComponent,
        AuthorityDeletePopupComponent,
    ],
    entryComponents: [
        AuthorityComponent,
        AuthorityDialogComponent,
        AuthorityPopupComponent,
        AuthorityDeleteDialogComponent,
        AuthorityDeletePopupComponent,
    ],
    providers: [
        AuthorityService,
        AuthorityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackerrAuthorityModule {}
