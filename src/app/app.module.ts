import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopNavComponent } from './topNav/top-nav/top-nav.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainPanelComponent } from './mainPanel/main-panel/main-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LeftPanelComponent,
    MainPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
