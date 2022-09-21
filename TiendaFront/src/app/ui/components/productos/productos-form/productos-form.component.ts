import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoria, IProducto } from 'src/app/core/domain/types';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { ProductosService } from 'src/app/core/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {

  productForm: FormGroup | undefined;
  productId: number | undefined;

  categorias: ICategoria[] = []

  private subs: Subscription[] = [];

  constructor(private service: ProductosService,
              private categoriasService: CategoriasService,
              private route: ActivatedRoute,
              private router: Router) {

      this.buildFormData(null);

     
   }

   ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(resp => this.categorias = resp);
    console.log(this.categorias)
    
    this.productId = +this.route.snapshot.params['id'];
    if (this.productId) {
      const sub1 = this.service.getProductosById( this.productId ).subscribe( user => {
        console.log(user);
        this.buildFormData(user);
      } );

      this.subs.push(sub1);
    }
  }


  onFormSubmit(): void {
    if (this.productForm?.invalid) {
      console.log( this.productForm.get('email')?.errors );
      throw Error('Formulario inválido');
    }

    const prouctData: IProducto = this.productForm?.value;

    if ( this.productId ) {
      
      prouctData.id = this.productId;
      const sub2 = this.service.updateProduct( prouctData ).subscribe( resp => {
        Swal.fire(
          '¿Actualizado!',
          `${prouctData.name} ha sido actualizado.`,
          'success'
        ).finally( () =>  this.router.navigate(['/productos']).finally());
      } );
      this.subs.push(sub2);
    } else {
      const sub3 = this.service.getProductosByName(prouctData.name!).subscribe(resp =>{
        if (resp == null) {
          this.crearProducto(prouctData);
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Ya existe ese producto!'
          })
        }
      })
      this.productForm?.reset();
      this.subs.push(sub3);
      
    }
  }

  private buildFormData(productdata: IProducto | null): void {
    this.productForm = new FormGroup({
      'name': new FormControl(productdata?.name, Validators.required),
      'price': new FormControl(productdata?.price, Validators.required),
      'inStock': new FormControl(productdata?.inStock, Validators.required),
      'image': new FormControl(productdata?.image),
      'category': new FormControl(productdata?.category, Validators.required),


    });
  }

  private crearProducto(productData: IProducto): void{
    const sub3 = this.service.addProduct( productData ).subscribe( resp => {
      if ( resp.id ) {
        Swal.fire(
          '¡Creado!',
          `${resp.name} ha sido creado.`,
          'success'
        ).finally( () =>  this.router.navigate(['/productos']).finally());
      }
    } );
    this.subs.push(sub3);
  }
  ngOnDestroy(): void {
      this.productId = undefined;
      this.subs.forEach( sub => sub.unsubscribe() );
  }

}
