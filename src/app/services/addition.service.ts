import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { QUESTION } from '../models/question';

@Injectable({
  providedIn: 'root'
})

export class AdditionService {

  private API_URL = 'api/questions';
  constructor(private http: HttpClient) { }

  getQuestion(): Observable<QUESTION[]> {
    return this.http.get<QUESTION[]>(this.API_URL).pipe(
      tap(_ => console.log('question returned'))
    );
  }
}
