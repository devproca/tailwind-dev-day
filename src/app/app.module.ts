import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SvgComponent } from './svg/svg.component';
import { SvgButtonComponent } from './svg-button/svg-button.component';
import { ChipComponent } from './chip/chip.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    SvgComponent,
    SvgButtonComponent,
    ChipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
