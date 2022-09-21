import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ERoles } from '../domain/enum';
import { IUser } from '../domain/types';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appIsAdmin]',
})
export class IsAdminDirective implements OnInit {
  @Input() public appIsAdmin = false;

  private isLoggedChanged$: Observable<IUser | null>;
  constructor(
    private auth: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    this.isLoggedChanged$ = this.auth.loggedUser$;
  }

  ngOnInit(): void {
    this.isLoggedChanged$.subscribe(loggedUser => {
      if ((loggedUser && loggedUser?.role === ERoles.ADMIN)) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  
  }}
