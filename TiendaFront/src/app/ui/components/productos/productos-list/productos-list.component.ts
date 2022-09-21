import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategoria, IProducto } from 'src/app/core/domain/types';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';
import { PrimeNGConfig } from 'primeng/api'


@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss']
})
export class ProductosListComponent implements OnInit {

  productos: IProducto[] = [];
  category: any;
  private subs: Subscription[] = [];

  productosTodos: IProducto[] = [];

  categorias: ICategoria[] = []
  selectedCategory: any;

  productoBuscar ="";

  constructor(private service: ProductosService,
    private categoriasService: CategoriasService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    const sub1 = this.service.getProductos().subscribe(resp => this.productos = resp.content);
    this.subs.push(sub1);
    this.categoriasService.getCategorias().subscribe(resp => this.categorias = resp);

    const sub3 = this.service.getProductosGeneral().subscribe(resp => this.productosTodos = resp);
    this.subs.push(sub3);

    this.primengConfig.ripple = true;

  }

  buscarProducto(): void {
    debugger;
    console.log("Buscar: "+this.productoBuscar)
    // const sub4 = this.service.getProductosByName("").subscribe(resp => this.productos = resp);
    // this.subs.push(sub4);
    var productosSearch: IProducto[] = [];
    for(let p of this.productos) {
      if(p.name?.toLowerCase().includes(this.productoBuscar.toLowerCase())) {
        productosSearch.push(p);
        console.log(p.name)
      }
    }
    this.productosTodos = [...productosSearch];
  }

  deleteProducto(producto: IProducto): void {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Se va a eliminar el producto '${producto.name}'`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub2 = this.service.deleteProduct(producto.id!).subscribe(resp => {

          this.productos = []
          this.service.getProductos().subscribe(resp => this.productos = resp)

          Swal.fire(
            'Producto Eliminado!',
            `${producto.name} ha sido eliminado.`,
            'success'
          );
        });
        this.subs.push(sub2);
      }
    })
  }

  addProduct(producto: IProducto, cantidad: string): void {
    debugger;
    var cantAddInt = parseInt(cantidad);
    if(cantAddInt <= producto.inStock!) {
      for (let i = 0; i < cantAddInt; i++) {
        const sub2 = this.service.addProductToBasket(producto);
        producto.inStock! --
        console.log(producto.inStock)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Producto Añadido!',
          showConfirmButton: false,
          timer: 500
        })
        this.service.updateProduct(producto).subscribe(console.log)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay suficiente cantidad!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  productosFiltrar: IProducto[] = [];
  filtrar(categoria: string, event: Event) {
    var filtro: IProducto[] = [];
    for (let p of this.productosTodos) {
      if (p.category?.name == categoria) {
        var nuevo: IProducto = p;
        filtro.push(nuevo);
      }
    }

    this.productosTodos = [...filtro];

    for (let p of this.productos) {
      console.log("BBB" + JSON.stringify(p))
    }
  }

  quitarFiltro() {
    const sub3 = this.service.getProductosGeneral().subscribe(resp => this.productosTodos = resp);
    this.subs.push(sub3);
  }

  hola(pageNumber: number) {
    const sub1 = this.service.getProductosByPage(pageNumber).subscribe(resp => this.productos = resp);
    console.log("Numero Pagina: " + pageNumber);
    this.subs.push(sub1);
  }

  onClear(): string {
    this.quitarFiltro();
    return "Selecciona una categoria"

  }


}
