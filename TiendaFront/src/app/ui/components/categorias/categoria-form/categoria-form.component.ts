import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoria } from 'src/app/core/domain/types';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit {

  categoriaForm: FormGroup | undefined;
  categoriaId: number | undefined;
  categoriaName: string | undefined;

  private subs: Subscription[] = [];

  constructor(private service: CategoriasService,
              private route: ActivatedRoute,
              private router: Router) {

      this.buildFormData(null);
   }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];
    this.getCategoryName();
  }

  getCategoryName(): void {
    if(this.categoriaId) {
      var sub1 = this.service.getCategoriasById(this.categoriaId).subscribe(resp => {
        this.categoriaName = resp.name;
      });
      this.subs.push(sub1);
    }
    
  }

  onFormSubmit(): void {
    if (this.categoriaForm?.invalid) {
      throw Error('Formulario inválido');
    }

    const categoriaData: ICategoria = this.categoriaForm?.value;

    if ( this.categoriaId ) {

      categoriaData.id = this.categoriaId;
      const sub2 = this.service.updateCategory( categoriaData ).subscribe( resp => {
        Swal.fire(
          '¡Actualizada!',
          `${categoriaData.name} ha sido actualizada.`,
          'success'
        ).finally( () =>  this.router.navigate(['/categorias']).finally());
      } );
      this.subs.push(sub2);
    } else {
      const sub3 =this.service.getCategoriaByName(categoriaData.name).subscribe(resp=>{
        if (resp == null) {
          this.crearCategoria(categoriaData);
          Swal.fire({
            icon: 'success',
            title: 'Categoria creada',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Ya existe esa categoria!'
          })
        }
      })
      this.categoriaForm?.reset();
      this.subs.push(sub3);
    }
  }

  private crearCategoria(categoriaData: ICategoria): void{
    const sub4 = this.service.addCategory( categoriaData ).subscribe( resp => {
      if ( resp.id ) {
        Swal.fire(
          '¡Creada!',
          `${resp.name} ha sido creada.`,
          'success'
        ).finally( () =>  this.router.navigate(['/categorias']).finally());
      }
    } );
    this.subs.push(sub4);
  }

  private buildFormData(productdata: ICategoria | null): void {
    this.categoriaForm = new FormGroup({
      'name': new FormControl(productdata?.name, Validators.required)
    });
  }

  ngOnDestroy(): void {
      this.categoriaId = undefined;
      this.subs.forEach( sub => sub.unsubscribe() );
  }

}
