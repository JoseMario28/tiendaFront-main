import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoria } from '../domain/types';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl = `${environment.backendServer}/categorias`;  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCategoriasByPage(pageNumber: number): Observable<ICategoria[]> {
    const url = `${this.categoriasUrl}/page/${pageNumber}`;
    return this.http.get<ICategoria[]>(url).pipe(
      tap(_ => console.log(`fetched page number=${pageNumber}`)),
      catchError(this.handleError<ICategoria[]>(`getUserByPage page=${pageNumber}`))
    );
  }
  
  getCategorias(): Observable<ICategoria[]> {
    return this.http.get<ICategoria[]>(this.categoriasUrl)
    .pipe(
      catchError(this.handleError<ICategoria[]>('getUsers', []))
    );
  }

  getCategoriasById(id: number): Observable<ICategoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<ICategoria>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<ICategoria>(`getUserById id=${id}`))
    );
  }

  getCategoriaByName(name:string): Observable<ICategoria> {
    const url = `${this.categoriasUrl}/name/?name=${name}`;
    return this.http.get<ICategoria>(url).pipe(
      tap((_) => console.log(`fetched categoria name=${name}`)),
      catchError(this.handleError<ICategoria>(`getCategoriaByName name=${name}`))
    );
  }

  addCategory(categoria: ICategoria): Observable<ICategoria> {
    return this.http.post<ICategoria>(this.categoriasUrl, categoria, this.httpOptions).pipe(
      tap((newUser: ICategoria) => console.log(`added category w/ id=${newUser.id}`)),
      catchError(this.handleError<ICategoria>('addProduct'))
    );
  }

  updateCategory(categoria: ICategoria): Observable<any> {
    console.log(`Updating user:`, categoria);
    return this.http.put(`${this.categoriasUrl}/${categoria.id}`, categoria, this.httpOptions).pipe(
      tap(_ => console.log(`updated category id=${categoria.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteCategory(id: number): Observable<ICategoria> {
    const url = `${this.categoriasUrl}/${id}`;

    return this.http.delete<ICategoria>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted category id=${id}`)),
      catchError(this.handleError<ICategoria>('deleteCategory'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
