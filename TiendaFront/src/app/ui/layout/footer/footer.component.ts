import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerForm!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.footerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.required),
  });
  }

  onFormSubmit(): void {
    // alert("Entra");
    if (this.footerForm?.invalid) {
      throw Error('Formulario inválido');
    }
    const footerFormData = this.footerForm?.value;
    console.log(footerFormData);

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El mesaje ha sido enviado',
      showConfirmButton: false,
      timer: 1500
    })
    this.footerForm.reset();
  }

}
