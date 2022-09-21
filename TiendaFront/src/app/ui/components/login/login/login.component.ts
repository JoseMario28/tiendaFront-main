import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILoginRequest } from 'src/app/core/domain/types';
//import { ILogingRequest, IUser } from 'src/app/core/domain/types';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
//import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
    ) {
    //controles
    this.formLogin = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit(): void {}
  onFormSubmit(): void {

    const data: ILoginRequest = this.formLogin.value;
    console.log(this.formLogin.value);

    this.auth.authenticate(data).subscribe(user => {
      if (user) {
        this.router.navigate(['/users']);
        this.auth._logueado.next(this.auth.isAdmin())
      }else{
        throw Error('El usuario es inccorecto')
      }
    });

    
  }
}
