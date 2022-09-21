import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LazyLoadEvent } from "primeng/api";
import { Subscription } from "rxjs";
import { IUser } from "src/app/core/domain/types";
import { UsersService } from "src/app/core/services/users.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  p: number = 1;
  total: number = 0;
  
  cols: any[] | undefined;

  totalRecords: number | undefined;

  loading: boolean | undefined;
  users: IUser[] = [];
  virtualDatabase!: IUser[];
//totalRecords=this.users.length;
  private subs: Subscription[] = [];
  constructor(private service: UsersService , private route:ActivatedRoute) { }
  ngOnInit(): void {
      const sub1 = this.service.getUsers().subscribe( resp => this.users = resp );
      this.subs.push(sub1);
  }
  hola(pageNumber: number){
    
    const sub1 = this.service.getUsersByPage(pageNumber).subscribe( resp => this.users = resp );
    this.subs.push(sub1);
  }
  deleteUser(user: IUser): void {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `¡Se va a eliminar el usuario '${user.name}'!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        const sub6 =   this.service.deleteUser(user.id).subscribe( resp => {

          this.users = []
          this.service.getUsers().subscribe(resp => this.users = resp)

          Swal.fire(
            '¡Borrado!',
            `${user.name} ha sido eliminado.`,
            'success'
          );
        } );
      }
    })
  }
  
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
  }
  ngOnDestroy(): void {
   
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}