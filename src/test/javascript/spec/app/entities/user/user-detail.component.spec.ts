/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { TrackerrTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserDetailComponent } from '../../../../../../main/webapp/app/entities/user/user-detail.component';
import { UserService } from '../../../../../../main/webapp/app/entities/user/user.service';
import { User } from '../../../../../../main/webapp/app/entities/user/user.model';

describe('Component Tests', () => {

    describe('User Management Detail Component', () => {
        let comp: UserDetailComponent;
        let fixture: ComponentFixture<UserDetailComponent>;
        let service: UserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TrackerrTestModule],
                declarations: [UserDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserService,
                    JhiEventManager
                ]
            }).overrideTemplate(UserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new User(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.user).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
