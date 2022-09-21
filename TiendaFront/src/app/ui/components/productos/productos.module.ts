import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import {PaginatorModule} from 'primeng/paginator';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListComponent } from './productos-list/productos-list.component';
import {DataViewModule} from 'primeng/dataview';
import { PanelModule } from 'primeng/panel'
import { RippleModule } from 'primeng/ripple';


//import{Ng2SearchPipeModule} from 'ng2-search-filter';
//import{Ng2OrderModule}from 'ng2-order-pipe';



const routes: Routes = [
  { path: '', component: ProductosListComponent },
  { path: ':id', component: ProductosDetailComponent },
  { path: 'form/create', component: ProductosFormComponent },
  { path: 'form/update/:id', component: ProductosFormComponent },
  { path: 'page/:pageNumber', component: ProductosListComponent}
];

@NgModule({
  declarations: [
    ProductosListComponent,
    ProductosFormComponent,
    ProductosDetailComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DirectivesModule,
    PaginatorModule,
    RouterModule,
    RouterModule.forChild(routes),
    DataViewModule,
    PanelModule,
    RippleModule


  ]
  // exports: [
  //   ProductosListComponent,
  //   ProductosDetailComponent,
  //   ProductosFormComponent
  // ]
})
export class ProductosModule { }