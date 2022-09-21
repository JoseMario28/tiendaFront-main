import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategoria } from 'src/app/core/domain/types';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  categorias: ICategoria[] = [];
  private subs: Subscription[] = [];

  constructor(private service: CategoriasService) { }

  ngOnInit(): void {
    const sub1 = this.service.getCategorias().subscribe(resp => this.categorias = resp);
    this.subs.push(sub1);
  }

  deleteCategoria(categoria: ICategoria):void {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Se va a eliminar la categoria '${categoria.name}' `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const sub2 = this.service.deleteCategory(categoria.id).subscribe(resp => {
          
          this.categorias = []
          this.service.getCategorias().subscribe(resp => this.categorias = resp)

          Swal.fire(
            '¡Eliminada!',
            `${categoria.name} ha sido eliminada.`,
            'success'
          );
        });
        this.subs.push(sub2);
      }
    })
  }

  paginator(pageNumber: number) {
    const sub1 = this.service.getCategoriasByPage(pageNumber).subscribe(resp => this.categorias = resp);
    //console.log("Numero Pagina: " + pageNumber);
    this.subs.push(sub1);
  }

}
