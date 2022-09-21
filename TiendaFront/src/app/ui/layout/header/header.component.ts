import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  //private _logueado: Observable<boolean>
  private asd:boolean = false

  constructor(public auth: AuthService,

               private router:Router) { }

  
  menuItems: MenuItem[] = [];

  ngOnInit(): void {

    this.auth.logueado().subscribe(data =>{
      
        this.asd = data

        console.log("aaaa "+data)
      
      this.menuItems = [
        {
          label: 'Login',
          routerLink: '/login',
          icon: PrimeIcons.USER,
          visible: !this.auth.isAuthenticated()
        },
        {
          label: 'Usuarios',
          routerLink: '/users',
          icon: PrimeIcons.USERS,
          visible: this.asd,
          
        },
        {
          label: 'Productos',
          routerLink: '/productos',
          icon: PrimeIcons.SHOPPING_BAG,
        },
        {
          label: 'Cesta',
          routerLink: '/cesta',
          icon: PrimeIcons.SHOPPING_CART
        },
        {
          label: 'Categorias',
          routerLink: '/categorias',
          icon: PrimeIcons.TAGS,
          visible: this.auth.isAdmin()
        },
      ];
  } )
    
    

   
    
  }

  

  disconnect(): void {
    this.auth.disconnect();
    this.router.navigate(['/login'])

    this.auth._logueado.next(this.auth.isAuthenticated())
  }
}
