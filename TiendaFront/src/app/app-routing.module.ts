import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const rutas: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
 // { path: '', component: ProductosListComponent },
  {path: 'productos', loadChildren: () => import('./ui/components/productos/productos.module').then(m => m.ProductosModule) },
  {path: 'login' , loadChildren:() => import('./ui/components/login/login.module').then(m => m.LoginModule)},
  {path: 'categorias', loadChildren: () => import('./ui/components/categorias/categorias.module').then(m => m.CategoriasModule) },
  {path: 'cesta', loadChildren: () => import('./ui/components/cesta/cesta.module').then(m => m.CestaModule) },
  {path: 'users' , loadChildren:() => import('./ui/components/users/users.module').then(m => m.UsersModule), canLoad:[AuthGuard]},
  {path: 'cliente' , loadChildren:() => import('./ui/components/cliente/cliente.module').then(m => m.ClienteModule)},
  {path: 'factura' , loadChildren:() => import('./ui/components/factura/factura.module').then(m => m.FacturaModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
