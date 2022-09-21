import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../domain/types';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appIsAuth]',
})
export class IsAuthDirective implements OnInit {
  @Input() public appIsAuth = false;

  private isLoggedChanged$: Observable<IUser | null>;
  constructor(
    private auth: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    this.isLoggedChanged$ = this.auth.loggedUser$;
  }

  ngOnInit(): void {
    this.isLoggedChanged$.subscribe((loggedUser) => {
      if ((loggedUser && this.appIsAuth) || (!loggedUser && !this.appIsAuth)) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef);

      } else {
        this.viewContainerRef.clear();

      }
    });
/*
    if (this.appIsAuth === this.auth.isAuthenticated()) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);

    } else {

      this.viewContainerRef.clear();
    }*/
  }
}
