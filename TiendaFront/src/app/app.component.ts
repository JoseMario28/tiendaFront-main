import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { IProducto } from './core/domain/types';
import { CestaService } from './core/services/cesta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TiendaFront';


  constructor(){}

  menuItems: MenuItem[] = [];
  ngOnInit(): void {
  }
  
}
