import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { XomadCoreButtonComponent } from "./button.component";


const COMPONENTS = [
  XomadCoreButtonComponent
]

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class XomadCoreButtonModule {
}
