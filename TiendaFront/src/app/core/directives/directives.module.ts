import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAuthDirective } from './is-auth.directive';
import { IsAdminDirective } from './is-admin.directive';
import { IsEditorDirective } from './is-editor.directive';



@NgModule({
  declarations: [
    IsAuthDirective,
    IsAdminDirective,
    IsEditorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsAuthDirective,
    IsAdminDirective,
    IsEditorDirective
   ]
 })
export class DirectivesModule { }
