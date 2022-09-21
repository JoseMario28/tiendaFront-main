import { ICliente } from './../domain/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private usersUrl = `${environment.backendServer}/clientes`; // URL to web api

  cliente: ICliente | undefined;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getClientesByPage(pageNumber: number): Observable<ICliente[]> {
    const url = `${this.usersUrl}/page/${pageNumber}`;
    return this.http.get<ICliente[]>(url).pipe(
      tap(_ => console.log(`fetched page number=${pageNumber}`)),
      catchError(this.handleError<ICliente[]>(`getClientesByPage page=${pageNumber}`))
    );
  }

  constructor(private http: HttpClient, private auth: AuthService) {}


  /** GET clients from the server */
  getClientes(): Observable<ICliente[]> {
    return this.http
      .get<ICliente[]>(this.usersUrl)
      .pipe(
        tap(console.log),
        catchError(this.handleError<ICliente[]>('getClientes', []))
      );
  }

  /** GET clientes by id. Will 404 if id not found */
  getClientesById(id: number): Observable<ICliente> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<ICliente>(url).pipe(
      tap((_) => console.log(`fetched client id=${id}`)),
      catchError(this.handleError<ICliente>(`getClientesById id=${id}`))
    );
  }

  getClientByEmail(email:string): Observable<ICliente> {
    const url = `${this.usersUrl}/email/?email=${email}`;
    return this.http.get<ICliente>(url).pipe(
      tap((_) => console.log(`fetched client email=${email}`)),
      catchError(this.handleError<ICliente>(`getClientesById id=${email}`))
    );
  }

  /** POST: add a new client to the server */
  addCliente(client: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(this.usersUrl, client, this.httpOptions).pipe(
      tap((newCliente: ICliente) => console.log(`added cliente w/ id=${newCliente.name}`)),
      catchError(this.handleError<ICliente>('addCliente'))
    );
  }

  /** PUT: update the client on the server */
  updateClient(cliente: ICliente): Observable<any> {
    console.log(`Updating client:`, cliente);
    return this.http
      .put(`${this.usersUrl}/${cliente.client_id}`, cliente, this.httpOptions)
      .pipe(
        tap((_) => console.log(`updated client id=${cliente.client_id}`)),
        catchError(this.handleError<any>('updateClient'))
      );
  }

  /** DELETE: delete the client from the server */
  deleteClient(id: number): Observable<ICliente> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<ICliente>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted client id=${id}`)),
      catchError(this.handleError<ICliente>('deleteClient'))
    );
  }


  getclientsLocalStorage(): ICliente{
   
      var valor = localStorage.getItem("cliente_key");

      var valorJSON: ICliente;
      if (valor != null) {
        valorJSON = JSON.parse(valor);
        this.cliente = valorJSON;
      }
    

    return this.cliente!;
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
