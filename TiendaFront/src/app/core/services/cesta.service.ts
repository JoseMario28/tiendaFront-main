import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto, IProductoCesta } from '../domain/types';
import { ProductosService } from './productos.service';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  

  productos: IProducto[] = [];
  


  constructor() { }

  getProductsLocalStorage(): IProducto[] {
    for (var x = 0; x < localStorage.length; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");
      //console.log(clave)

      var valorJSON: IProducto;
      if (valor != null && clave != 'cliente_key') {
        valorJSON = JSON.parse(valor);

        this.productos.push(valorJSON);

      }
    }
    return this.productos;
  }

  getProductsLocalStorage2(): IProductoCesta[] {
    var productosCesta: IProductoCesta[] = [];
    for (var x = 0; x < localStorage.length; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");
      console.log(clave)

      var valorJSON: IProducto;
      if (valor != null && clave != 'cliente_key') {
        valorJSON = JSON.parse(valor);
        var existe = false;
        for (let p of productosCesta) {
          if (p.name == valorJSON.name) {
            existe = true;
          }
        }
        if (!existe) {
          var productoNuevo = { id: valorJSON.id, name: valorJSON.name, price: valorJSON.price, cuantity: 1 };
          productosCesta.push(productoNuevo);
        } else {
          for (let p of productosCesta) {
            if (p.name == valorJSON.name && p.cuantity) {
              p.cuantity += 1;
            }
          }
        }
      }
    }
    return productosCesta;
  }

  getProductsLocalStorage3(): IProducto[] {
    var productos3: IProducto[] = [];
    for (var x = 0; x < localStorage.length; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");
      var valorJSON: IProducto;
      if (valor != null && clave != 'cliente_key') {
        valorJSON = JSON.parse(valor);
        productos3.push(valorJSON);
      }
    }
    return productos3;
  }

  getProductsLocalStorageSinRep(): IProducto[] {
    var productos4: IProducto[] = [];
    for (var x = 0; x < localStorage.length; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");

      var valorJSON: IProducto;
      if (valor != null && clave != 'cliente_key') {
        valorJSON = JSON.parse(valor);
        var existe = false;
        for(let p of productos4) {
          if(p.name == valorJSON.name) {
            existe = true;
            if(valorJSON.inStock && p.inStock && valorJSON.inStock > p.inStock) {
              p.inStock = valorJSON.inStock;
            }
          }
        }
        if(!existe) {
          productos4.push(valorJSON);
        }
      }
    }
    return productos4;
  }

  /*
  devolverStock(producto: IProducto, cantidad: number) {
    var pro = this.getProductsLocalStorageSinRep();
    for(let p of pro) {
      if(p.inStock && p.name == producto.name) {
        p.inStock += cantidad;
        this.productosService.updateProduct(p).subscribe(prod => console.log );
      } 
    }
  }*/
}
