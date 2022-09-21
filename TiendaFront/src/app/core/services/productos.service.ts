import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from '../domain/types';
import { CestaService } from './cesta.service';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosUrl = `${environment.backendServer}/productos`;  // URL to web api
  private contKey: number = 0;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient,
    private cesta: CestaService) { }



  getProductosByPage(pageNumber: number): Observable<IProducto[]> {
    const url = `${this.productosUrl}/page/${pageNumber}`;
    return this.http.get<IProducto[]>(url).pipe(
      tap(_ => console.log(`fetched page number=${pageNumber}`)),
      catchError(this.handleError<IProducto[]>(`getProductosByPage page=${pageNumber}`))
    );
  }


  getProductos(): Observable<any> {
    return this.http.get<any>(this.productosUrl)
      .pipe(tap(console.log),
        catchError(this.handleError<any>('getProductos', []))
      );
  }

  getProductosGeneral(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.productosUrl}/todos`)
      .pipe(tap(console.log),
        catchError(this.handleError<IProducto[]>('getProductosGeneral', []))
      );
  }

  getProductosById(id: number): Observable<IProducto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<IProducto>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<IProducto>(`getProductosById id=${id}`))
    );
  }


  getProductosByName(name: string): Observable<IProducto> {
    const url = `${this.productosUrl}/name/?name=${name}`;
    return this.http.get<IProducto>(url).pipe(
      tap((_) => console.log(`fetched product name=${name}`)),
      catchError(this.handleError<IProducto>(`getProductosByName name=${name}`))
    );
  }


  addProduct(producto: IProducto): Observable<IProducto> {
    return this.http.post<IProducto>(this.productosUrl, producto, this.httpOptions).pipe(
      tap((newUser: IProducto) => console.log(`added product w/ id=${newUser.id}`)),
      catchError(this.handleError<IProducto>('addProduct'))
    );
  }

  updateProduct(producto: IProducto): Observable<any> {
    console.log(`Updating user:`, producto);
    return this.http.put(`${this.productosUrl}/${producto.id}`, producto, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${producto.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addProductToBasket(producto: IProducto): void {
    localStorage.setItem(this.contKey + "", JSON.stringify(producto))
    this.contKey++;
  }

  deleteProduct(id: number): Observable<IProducto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.delete<IProducto>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<IProducto>('deleteProduct'))
    );
  }

  devolverStock3(): void {
    var pro = this.cesta.getProductsLocalStorageSinRep();
    for (let p of pro) {
      this.updateProduct(p).subscribe(prod => console.log);
    }
  }

  devolverStockCantidad(producto: IProducto, cantidad: number): void {
    if (producto.name) {
      this.getProductosByName(producto.name).subscribe(p => {
        p.inStock! += cantidad;
        this.updateProduct(p).subscribe(prod => console.log);
      });
    }
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
