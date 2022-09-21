import { IProducto } from '../../../../core/domain/types';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/core/services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productos-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.scss']
})
export class ProductosDetailComponent implements OnInit {

  producto: IProducto | undefined;

  private subs: Subscription[] = [];

  constructor(private service: ProductosService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      const sub1 = this.service.getProductosById(userId).subscribe(resp => this.producto = resp);
      this.subs.push(sub1);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
