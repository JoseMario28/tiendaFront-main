import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CestaListComponent } from './cesta-list/cesta-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PaginatorModule } from 'primeng/paginator';

const routes: Routes = [
  { path: '', component: CestaListComponent }
];

@NgModule({
  declarations: [
    CestaListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DirectivesModule,
    PaginatorModule,
    RouterModule,
    RouterModule.forChild(routes)
  ]
})
export class CestaModule { }
