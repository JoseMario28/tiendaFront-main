import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/domain/types';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: IUser | undefined;
private subs: Subscription[] = [];

  constructor(private service: UsersService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      const sub4 =  this.service.getUserById( userId ).subscribe( resp => this.user = resp );
    }
  }
  ngOnDestroy(): void {
   
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
