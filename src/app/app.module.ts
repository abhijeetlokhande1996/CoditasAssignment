import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInputsComponent } from './user-inputs/user-inputs.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoaderComponent } from './user-inputs/loader/loader.component';
import { TimesPipe } from './pipes/times.pipe';
import { RepoLoaderComponent } from './user-details/repo-loader/repo-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    UserInputsComponent,
    UserDetailsComponent,
    LoaderComponent,
    TimesPipe,
    RepoLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
