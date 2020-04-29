import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from './../../../../config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsersApi {

    constructor(
        private http: HttpClient,
        private config: Config,
        private authService: AuthService,
    ) { }

    user( id:string, params ) {
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.get<any>(this.config.url + '/v1/users/'+id , { params, headers } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    update( id:string, params:any ) {
        let headers = new HttpHeaders();
        headers = headers.append("Authorization", "Bearer "+ this.authService.token.token);

        return this.http.put<any>(this.config.url + '/v1/users/'+id , params, { headers } ).pipe(
            map(data => data),
            catchError(this.handleError)
        );
    }

    private handleError(res: HttpErrorResponse | any) {
        return observableThrowError(res.error || 'Server error');
    }

}
