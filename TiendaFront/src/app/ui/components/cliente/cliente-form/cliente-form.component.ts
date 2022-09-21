import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ICliente, IFactura, IProducto } from 'src/app/core/domain/types';
import { ClientesService } from 'src/app/core/services/clientes.service';
import { FacturaService } from 'src/app/core/services/factura.service';
import Swal from 'sweetalert2';
import { FacturaDetailComponent } from '../../factura/factura-detail/factura-detail.component';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  providers: [DialogService, MessageService]
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup | undefined;
  clienteId: number | undefined;

  ref: DynamicDialogRef = new DynamicDialogRef();

  client:ICliente = {}

  productos: IProducto[] = [];

  private subs: Subscription[] = [];
  private subsFac: Subscription[] = [];

  constructor(private service: ClientesService,
    private facturaService: FacturaService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    public messageService: MessageService
    ) {

    this.buildFormData(null);

  }

  ngOnInit(): void {
    // this.clienteId = +this.route.snapshot.params['id'];
    // if (this.clienteId) {
    //   const sub1 = this.service.getClientesById(this.clienteId).subscribe(client => {
    //     console.log(client);
    //     this.buildFormData(client);
    //   });

    //   this.subs.push(sub1);
    // }
    for (var x = 0; x <= localStorage.length - 1; x++) {
      var clave = localStorage.key(x);
      var valor = localStorage.getItem(clave + "");
      if (clave == "producto_" + x && valor != null) {
        var producto = JSON.parse(valor);
        this.productos.push(producto);
      }
    }
  }

  onFormSubmit(): void {
    if (this.clienteForm?.invalid) {
      throw Error('Formulario inválido');
    }
    const clientData: ICliente = this.clienteForm?.value;


    if(clientData && clientData.email){
      this.service.getClientByEmail(clientData.email).subscribe(data => {
        if(data) {
          this.client = data;
          this.addClientToLocalStorage(JSON.stringify(this.client));
          Swal.fire(
            'Pedido Registrado!',
            'success'
          ).finally(() => this.show());
        
          
        }
        else{
          console.log("asdasdas")
          const sub3 = this.service.addCliente(clientData).subscribe(resp => {
            if (resp.client_id) {
              Swal.fire(
                '¡Cliente Creado!',
                `${resp.name} ha sido creado.`,
                'success'
              ).finally(() => this.show());
              console.log("on submit" + clientData)
            const sub4 = this.service.getClientByEmail(clientData.email!).subscribe(resp =>{ 
            this.addClientToLocalStorage(JSON.stringify(resp))
            this.subs.push(sub4);
          });
            }
          });
          this.subs.push(sub3);
        }
      })
    }

    console.log("dataClient email " + clientData.email)

  }

  addClientToLocalStorage(client: string): void{

    console.log(client)
    localStorage.setItem("cliente_key", client)
  }

  show() {
    this.ref = this.dialogService.open(FacturaDetailComponent, {
      width: '80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      closable: false,
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe(() =>{
      
      this.messageService.add({severity:'info', summary: 'Factura registrada', detail: "DSDS"});
      this.router.navigate(['']).finally()
    
  });

  }


  private buildFormData(clientedata: ICliente | null): void {
    this.clienteForm = new FormGroup({
      'country': new FormControl(clientedata?.country, Validators.required),
      'dateOfBirth': new FormControl(clientedata?.dateOfBirth, Validators.required),
      'email': new FormControl(clientedata?.email, [Validators.required, Validators.email]),
      'name': new FormControl(clientedata?.name, Validators.required),
      'surname': new FormControl(clientedata?.surname, Validators.required)
    });
  }

  ngOnDestroy(): void {
    this.clienteId = undefined;
    this.subs.forEach(sub => sub.unsubscribe());

    if (this.ref) {
      this.ref.close();
  }
  }


}
