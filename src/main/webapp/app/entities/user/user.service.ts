import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { User } from './user.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {Principal} from '../../shared/auth/principal.service';

@Injectable()
export class UserService {

    private resourceUrl = SERVER_API_URL + 'api/users';
    private account: Account;

    constructor(
        private http: Http,
        private dateUtils: JhiDateUtils,
        private principal: Principal

    ) { }

    create(user: User): Observable<User> {
        const copy = this.convert(user);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(user: User): Observable<User> {
        const copy = this.convert(user);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    findCurrentUser(): User {
        let user: User;
         this.http.get(`${this.resourceUrl}/currUser`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        }).subscribe(((us) => {user = us ; } ), ( (err) => { console.log(err); } ), (() => console.log('completed')) );
         return user;

    }

    find(id: number): Observable<User> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     */
    private convertItemFromServer(json: any): User {
        const entity: User = Object.assign(new User(), json);
        entity.createdDate = this.dateUtils
            .convertDateTimeFromServer(json.createdDate);
        entity.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(json.lastModifiedDate);
        return entity;
    }

    /**
     * Convert a User to a JSON which can be sent to the server.
     */
    private convert(user: User): User {
        const copy: User = Object.assign({}, user);

        copy.createdDate = this.dateUtils.toDate(user.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(user.lastModifiedDate);
        return copy;
    }
}
