import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaDetailComponent } from './factura-detail/factura-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import {CardModule} from 'primeng/card';


const routes: Routes=[
  { path: '', component: FacturaDetailComponent },
  //{ path: 'form/create', component: ClienteFormComponent , }
];

@NgModule({
  declarations: [
    FacturaDetailComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    InputSwitchModule,
    DirectivesModule,
    CardModule
  ]
})
export class FacturaModule { }
