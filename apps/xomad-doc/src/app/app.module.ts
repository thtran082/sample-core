import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { XomadCoreButtonModule } from '@xomad/web-core/components/button';
import { XoShepherdService } from '@xomad/web-core/services';
import { XoReorderGridModule } from '@xomad/web-core/components/reorder-grid';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    XomadCoreButtonModule,
    XoReorderGridModule,
  ],
  providers: [
    XoShepherdService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
