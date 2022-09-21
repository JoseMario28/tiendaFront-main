import { IFactura } from './../domain/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private usersUrl = `${environment.backendServer}/facturas`; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  getFacturasByPage(pageNumber: number): Observable<IFactura[]> {
    const url = `${this.usersUrl}/page/${pageNumber}`;
    return this.http.get<IFactura[]>(url).pipe(
      tap(_ => console.log(`fetched page number=${pageNumber}`)),
      catchError(this.handleError<IFactura[]>(`getFacturasByPage page=${pageNumber}`))
    );
  }

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** GET invoices from the server */
  getFacturas(): Observable<IFactura[]> {
    return this.http
      .get<IFactura[]>(this.usersUrl)
      .pipe(
        tap(console.log),
        catchError(this.handleError<IFactura[]>('getFacturas', []))
      );
  }

  /** GET invoices by id. Will 404 if id not found */
  getFacturasById(id: number): Observable<IFactura> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<IFactura>(url).pipe(
      tap((_) => console.log(`fetched client id=${id}`)),
      catchError(this.handleError<IFactura>(`getFacturasById id=${id}`))
    );
  }

  /** POST: add a new invoices to the server */
  addFactura(factura: IFactura): Observable<IFactura> {
    return this.http.post<IFactura>(this.usersUrl, factura, this.httpOptions).pipe(
      tap((newFactura: IFactura) => console.log(`added factura w/ id=${newFactura.invoice_id}`)),
      catchError(this.handleError<IFactura>('addFactura'))
    );
    
  }

  /** PUT: update the invoices on the server */
  updateFactura(factura: IFactura): Observable<any> {
    console.log(`Updating client:`, factura);
    return this.http
      .put(`${this.usersUrl}/${factura.invoice_id}`, factura, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated invoices id=${factura.invoice_id}`)),
        catchError(this.handleError<any>('updateFactura'))
      );
  }

  /** DELETE: delete the invoices from the server */
  deleteFactura(id: number): Observable<IFactura> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<IFactura>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted invoices id=${id}`)),
      catchError(this.handleError<IFactura>('deleteFactura'))
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
