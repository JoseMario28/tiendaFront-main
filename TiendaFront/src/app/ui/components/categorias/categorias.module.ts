import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import {PaginatorModule} from 'primeng/paginator';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CategoriaListComponent },
  { path: 'form/create', component: CategoriaFormComponent },
  { path: 'form/update/:id', component: CategoriaFormComponent },
];

@NgModule({
  declarations: [
    CategoriaListComponent,
    CategoriaFormComponent
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
    RouterModule.forChild(routes)
  ]
  // exports: [
  //   CategoriaListComponent,
  //   CategoriaFormComponent
  // ]
})
export class CategoriasModule { }
