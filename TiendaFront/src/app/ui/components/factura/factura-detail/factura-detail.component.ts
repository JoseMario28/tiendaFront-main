import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICliente, IFactura, IProducto, IProductoCesta } from 'src/app/core/domain/types';
import { CestaService } from 'src/app/core/services/cesta.service';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { FacturaService } from 'src/app/core/services/factura.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-factura-detail',
  templateUrl: './factura-detail.component.html',
  styleUrls: ['./factura-detail.component.scss']
})
export class FacturaDetailComponent implements OnInit {

  @ViewChild('html-data') htmlData!: ElementRef;

  factura: IFactura = {}

  productos: IProducto[] = [];

  fecha = new Date();

  cliente: ICliente = {};

  precioTotal: number = 0;

  productosFactura: IProductoCesta[] = []

  constructor(private cesta: CestaService,
    private clientService: ClientesService,
    private facturaService: FacturaService,
    private router: Router,
    private productoService: ProductosService,
    private clienteForm: ClienteFormComponent) { }

  ngOnInit(): void {

    this.productos = this.cesta.getProductsLocalStorage();
    this.cliente = this.clientService.getclientsLocalStorage();
    this.productosFactura = this.cesta.getProductsLocalStorage2();
    this.precioTotal = this.getPrecioTotal();

  }

  public openPDF(): void {
    let DATA: any = document.getElementById('html-data');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      let posIzq = 10
      PDF.addImage(FILEURI, 'PNG', posIzq, position, fileWidth, fileHeight);
      PDF.save('Factura.pdf');
    });
  }

  saveInvoice(): void {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Compra Realizada!',
      showConfirmButton: false,
      timer: 1500
    }).finally(() => {

      this.factura = {
        invoiceDate: this.getToday(),
        totalPrice: this.precioTotal,
        client: this.cliente,
        products: this.productos
      }

      this.facturaService.addFactura(this.factura).subscribe(console.log)
      localStorage.clear();
    });

  }

  getPrecioTotal(): number {
    //location.reload();
    var precioTotal: number | undefined = 0;
    for (var x = 0; x < localStorage.length; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");
      console.log(clave)

      var valorJSON: IProducto;
      if (valor != null && clave != 'cliente_key') {
        valorJSON = JSON.parse(valor);

        precioTotal += valorJSON.price!;
      }
    }
    return precioTotal;
  }

  getToday(): string {

    const day = this.fecha.getDate();
    const month = this.fecha.getMonth();
    const year = this.fecha.getFullYear();

    const fechaActual: string = day + "/" + month + "/" + year;
    return fechaActual;
  }

  guardar(){
    this.saveInvoice();
    this.clienteForm.ref.close("");
  }

  cancelar(){
    this.clienteForm.ref.close("");
    this.cancelInvoice();
  }

  cancelInvoice(): void {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Si cancelas, se perderan los productos de tu cesta`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancelar compra'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.devolverStock3();
        localStorage.clear();
        
        Swal.fire(
          'Pedido cancelado!',
          `El pedido ha sido cancelado`,
          'success'
        ).finally(() => this.router.navigate(['']).finally());
      }
      else{
        this.clienteForm.show();
      }
    })

  }

  // devolverStock(): void {
  //   var devueltos: string[] = [];
  //   for (var x = 0; x < localStorage.length; x++) {
  //     var clave = localStorage.key(x);
  //     var valor = localStorage.getItem(clave + "");
  //     var valorJSON: IProducto;
  //     if (valor != null && clave != 'cliente_key') {
  //       valorJSON = JSON.parse(valor);
  //       if (valorJSON.inStock && valorJSON.name && devueltos.indexOf(valorJSON.name) == -1 ) {
  //         valorJSON.inStock;
  //         this.productoService.updateProduct(valorJSON).subscribe(resp => console.log);
  //       }
  //       if(valorJSON.name) {
  //         devueltos.push(valorJSON.name);
  //       }
  //     }
  //   }
  // }

  /*
  devolverStock2(): void {
    //debugger;
    var productoLocal = this.cesta.getProductsLocalStorage3();
    var devolver = [{
      nombre:'null',
      cant:0
    }];
    var devueltos = Object.keys(devolver);

    for(let p of productoLocal) {
      if(p.name && devueltos.indexOf(p.name) == -1) {
        var prod = {
          nombre: p.name,
          cant: 1
        };
        devolver.push(prod);
        devueltos.push(p.name);
      } else if(p.name) {
        for(let p2 of devolver) {
          if(p2.nombre == p.name) {
            p2.cant += 1;
          }
        }
      }
    }

    var productosBbdd = this.productoService.getProductosGeneral().subscribe( productos => {
      for(let p1 of devolver) {
        for(let p2 of productos) {
          if(p1.nombre == p2.name && p2.inStock) {
            p1.cant += p2.inStock;
          }
        }
      }
    });
    
    var prodActualizar = this.cesta.getProductsLocalStorageSinRep();
    for(let p of prodActualizar) {
      this.productoService.updateProduct(p).subscribe(prod => console.log );
    }

  }
  */

}
