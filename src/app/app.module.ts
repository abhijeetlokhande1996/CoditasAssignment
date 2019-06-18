import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoaderComponent } from './user-inputs/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInputsComponent,
    UserDetailsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
