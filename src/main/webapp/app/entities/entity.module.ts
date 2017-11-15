import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrackerrUserModule } from './user/user.module';
import { TrackerrProjectModule } from './project/project.module';
import { TrackerrTaskModule } from './task/task.module';
import { TrackerrCommentModule } from './comment/comment.module';
import { TrackerrStatusModule } from './status/status.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TrackerrUserModule,
        TrackerrProjectModule,
        TrackerrTaskModule,
        TrackerrCommentModule,
        TrackerrStatusModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrackerrEntityModule {}
