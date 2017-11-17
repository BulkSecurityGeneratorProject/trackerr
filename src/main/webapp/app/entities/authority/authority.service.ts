import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Authority } from './authority.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AuthorityService {

    private resourceUrl = SERVER_API_URL + 'api/authorities';

    constructor(private http: Http) { }

    create(authority: Authority): Observable<Authority> {
        const copy = this.convert(authority);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(authority: Authority): Observable<Authority> {
        const copy = this.convert(authority);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Authority> {
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
     * Convert a returned JSON object to Authority.
     */
    private convertItemFromServer(json: any): Authority {
        const entity: Authority = Object.assign(new Authority(), json);
        return entity;
    }

    /**
     * Convert a Authority to a JSON which can be sent to the server.
     */
    private convert(authority: Authority): Authority {
        const copy: Authority = Object.assign({}, authority);
        return copy;
    }
}
