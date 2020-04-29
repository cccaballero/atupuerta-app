import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from './../../../../config';
import { Foods } from '../../models/Foods';
import { Comment } from '../../models/Comment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class FoodsApi {

    constructor(
        private http: HttpClient,
        private config: Config,
        private authService: AuthService,
    ) { }

    foods( params:any ){
        return this.http.get<Array<Foods>>(this.config.url + '/v1/foods', { params } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    my( params:any ){
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.get<Array<Foods>>(this.config.url + '/v1/myfoods', { params, headers } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    foodId( id:string, params:any ){
        return this.http.get<Foods>(this.config.url + '/v1/foods/' + id, { params } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    create( params:any, query:any = {} ){
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.post<Foods>(this.config.url + '/v1/foods', params, {headers, params:query } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    edit( id:any, params:any ){
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.put<Foods>(this.config.url + '/v1/foods/'+id, params, {headers } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    comments( id:any, params:any ){
        return this.http.get<Array<Comment>>(this.config.url + '/v1/foods/'+id +"/comments", { params } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    createComments( id:any, params:any, query:any = {} ){
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.post<Comment>(this.config.url + '/v1/comments', params, {headers, params:query } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    private handleError(res: HttpErrorResponse | any) {
        return observableThrowError(res.error || 'Server error');
    }

}
