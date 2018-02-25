import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Character } from './character';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CharacterService {

  private characterListURL = 'http://localhost:49679/api/characterlist';
  private characterURL = 'http://localhost:49679/api/characterdetail';
  private characterSearchURL = 'http://localhost:49679/api/charactersearch'

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a CharacterService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CharacterService: ' + message);
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.characterListURL)
      .pipe(
        tap(characters => this.log(`fetched characters`)),
        catchError(this.handleError('getCharacters', []))
      );
  }

  /** GET character by id. Will 404 if id not found */
  getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.characterURL}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched character id=${id}`)),
        catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  /** PUT: update the character on the server */
  updateCharacter (character: Character): Observable<any> {
    return this.http.put(this.characterURL, character, httpOptions).pipe(
      tap(_ => this.log(`updated character id=${character.id}`)),
      catchError(this.handleError<any>('updateCharacter'))
    );
  }

  /** POST: add a new character to the server */
  addCharacter (character: Character): Observable<Character> {
    return this.http.post<Character>(this.characterListURL, character, httpOptions).pipe(
      tap((character: Character) => this.log(`added character w/ id=${character.id}`)),
      catchError(this.handleError<Character>('addCharacter'))
    );
  }

  /** DELETE: delete the character from the server */
  deleteCharacter (character: Character): Observable<Character> {
    const url = `${this.characterURL}/${character.id}`;

    return this.http.delete<Character>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${character.id}`)),
      catchError(this.handleError<Character>('delteCharacter'))
    )
  }

  /* GET characters whose name contains search term */
  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      // if not search term, return empty character array
      return of([]);
    }

    return this.http.get<Character[]>(`${this.characterSearchURL}/${term}`).pipe(
      tap(_ => this.log(`found characters matching "${term}`)),
      catchError(this.handleError<Character[]>('searchCharacters', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
