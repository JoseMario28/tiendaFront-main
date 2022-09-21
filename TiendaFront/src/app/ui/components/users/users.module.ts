
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { PaginatorModule } from 'primeng/paginator';

import { RoleGuard } from 'src/app/core/guards/role.guard';
import { ERoles } from 'src/app/core/domain/enum';
import { DropdownModule } from 'primeng/dropdown';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes=[
//data es para espicificar parametos de la ruta
  { path: '', component: UsersListComponent },
  { path: ':id', component: UserDetailComponent },
  { path: 'form/create', component: UserFormComponent , canActivate: [RoleGuard], data: { role: ERoles.ADMIN }},
  { path: 'form/update/:id', component: UserFormComponent, canActivate: [RoleGuard], data: { role: [ERoles.EDITOR, ERoles.ADMIN]} },
  { path: 'page/:pageNumber', component: UsersListComponent}

];

@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent,
    UserDetailComponent
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    DirectivesModule,
    PaginatorModule,
    DropdownModule
  ],
  
  exports:[
    UsersListComponent,
    UserFormComponent,
    UserDetailComponent

  ]
})
export class UsersModule { }
