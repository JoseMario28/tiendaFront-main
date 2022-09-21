import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PaginatorModule } from 'primeng/paginator';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

const routes: Routes=[
    { path: '', component: ClienteFormComponent },
    //{ path: 'form/create', component: ClienteFormComponent , }
  ];

@NgModule({
  declarations: [
    ClienteFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    InputSwitchModule,
    DirectivesModule,
    PaginatorModule,
    DynamicDialogModule
  ],
  exports:[
    ClienteFormComponent

  ]
})
export class ClienteModule { }
