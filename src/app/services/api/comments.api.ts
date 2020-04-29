import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from './../../../../config';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class CommentsApi {

    constructor(
        private http: HttpClient,
        private config: Config,
        private authService: AuthService,
    ) { }

    

    private handleError(res: HttpErrorResponse | any) {
        return observableThrowError(res.error || 'Server error');
    }

}
