import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectivesModule } from './core/directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './ui/layout/header/header.component';
import { CestaListComponent } from './ui/components/cesta/cesta-list/cesta-list.component';


import { FooterComponent } from './ui/layout/footer/footer.component';

import { HTTP_INTERCEPTORS_PROVIDERS } from './core/http';
import { FacturaDetailComponent } from './ui/components/factura/factura-detail/factura-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    DirectivesModule,ReactiveFormsModule
  ],
  entryComponents: [
    FacturaDetailComponent
  ],


  providers: [CestaListComponent,HTTP_INTERCEPTORS_PROVIDERS],

  bootstrap: [AppComponent]
})
export class AppModule { }
