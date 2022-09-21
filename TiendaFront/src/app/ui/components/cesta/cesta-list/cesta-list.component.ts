import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducto, IProductoCesta } from 'src/app/core/domain/types';
import { CestaService } from 'src/app/core/services/cesta.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';
import { FacturaDetailComponent } from '../../factura/factura-detail/factura-detail.component';
@Component({
  selector: 'app-cesta-list',
  templateUrl: './cesta-list.component.html',
  styleUrls: ['./cesta-list.component.scss']
})
export class CestaListComponent implements OnInit, OnDestroy {
  productoApi: IProducto = {};
  productos: IProductoCesta[] = [];
  private subs: Subscription[] = [];
  precioTotal: number = 0;
  productosEnteros: IProducto[] = []
  constructor(private service: ProductosService,
    private cestaService: CestaService,
    private route: Router) { }
  ngOnDestroy(): void {
    this.productos.splice(0)
    //console.log("Me ejecuto ondestroy")
    //console.log(this.productos.length)
  }
  ngOnInit(): void {
    console.log(localStorage.length)
    this.getProductsLocalStorage()
    this.getPrecioTotal();
    this.productosEnteros = this.cestaService.getProductsLocalStorage();
  }
  getProductsLocalStorage(): void {
    this.productos = this.cestaService.getProductsLocalStorage2();
  }
  getPrecioTotal(): void {
    this.productos.forEach(producto => this.precioTotal += (producto.price! * producto.cuantity!));
  }

  getPrecioTotal2(): number {
    var suma = 0;
    this.productos.forEach(producto => suma += (producto.price! * producto.cuantity!))
    return suma;
  }

  deleteFromBasket(producto: IProducto, cantidadEliminar: string): void {
    var canElInt = parseInt(cantidadEliminar);
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Va a eliminar ${canElInt} ${producto.name} de la cesta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteConfirm2(producto, canElInt);
      }
    })
  }
  /*actualizarStock(){
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Va a eliminar de la cesta el producto:`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("PRODUCTOS ENTEROS ANTES " + JSON.stringify(this.productosEnteros))
        this.productosEnteros.sort(function (a,b){
          if(a.inStock! < b.inStock!)
          {
            return -1
          }
          else if( a.inStock! > b.inStock!)
          {
            return 1
          }
          return 0
        })
        console.log("PRODUCTOS ENTEROS DESPUES " + JSON.stringify(this.productosEnteros))
        for(let p of this.productosEnteros)
        {
          console.log(p + "dasdasdadadasdasdasdadasdasddas")
          this.service.getProductosById(p.id!).subscribe(resp =>{
            this.productoApi = resp
            p = this.productoApi
            console.log(JSON.stringify(p) + " ANTES")
            //p.inStock!++
            localStorage.clear()
          })
          this.service.updateProduct(p).subscribe(resp => {
            p = resp
            console.log(JSON.stringify(p) + " DESPUES")
          })
        }
      }
    })
  }*/
  vaciarCesta(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta a punto de vaciar la cesta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.devolverStock3();
        localStorage.clear();
        this.productos = [];
        this.precioTotal = 0;
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  deleteConfirm(producto: IProducto, cantidad: number): void {
    var eliminado = false;
    for (var x = 0; x < localStorage.length && !eliminado; x++) {
      var clave = localStorage.key(x);
      var valor: string | null;
      var objeto: IProducto;
      if (clave != null) {

        valor = localStorage.getItem(clave);
        if (valor != null) {
          objeto = JSON.parse(valor)


          this.precioTotal = this.getPrecioTotal2();

          window.location.reload();
          if (objeto.name === producto.name) {
            localStorage.removeItem(clave);
            eliminado = true;
            this.productos.splice(0)
            this.getProductsLocalStorage()
          }
        }
      }
    }
  }
  deleteConfirm2(producto: IProducto, cantidad: number): void {
    this.service.devolverStockCantidad(producto, cantidad);
    var eliminados = 0;
    var total = localStorage.length;
    var keys: string[] = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      var k = localStorage.key(i);
      if (k) {
        keys.push(k);
      }
    }
    for (var x = 0; x <= total && eliminados < cantidad; x++) {
      var clave = keys[x];
      var valor: string | null;
      var objeto: IProducto;
      if (clave != null) {
        valor = localStorage.getItem(clave);
        if (valor != null) {
          objeto = JSON.parse(valor)
          this.precioTotal = this.precioTotal - objeto.price!;
          if (objeto.name === producto.name) {
            localStorage.removeItem(clave);
            eliminados += 1;
          }
        }
      }
    }
    this.productos = this.cestaService.getProductsLocalStorage2();
  }
  paginator(pageNumber: number) {
    const sub1 = this.service.getProductosByPage(pageNumber).subscribe((resp: IProducto[]) => this.productos = resp);
    //console.log("Numero Pagina: " + pageNumber);
    this.subs?.push(sub1);
  }
}