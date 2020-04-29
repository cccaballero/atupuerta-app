import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from './../../../../config';

@Injectable({
  providedIn: 'root'
})

export class AuthApi {

    constructor(
        private http: HttpClient,
        private config: Config,
    ) { }

    register( params:any, query:any = {} ){
        return this.http.post<any>(this.config.url + '/v1/users', params, {params:query} ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    login(username: string, password: string) {
        let params = {
            username,
            password
        };

        return this.http.post<any>(this.config.url + '/v1/login', params ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    private handleError(res: HttpErrorResponse | any) {
        return observableThrowError(res.error || 'Server error');
    }

}
