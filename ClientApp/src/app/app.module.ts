import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { PersonService } from './services/person.service';
import { PersonComponent } from './components/person/person.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonUpdateComponent } from './components/person-update/person-update.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonComponent,
    PersonDetailComponent,
    PersonCreateComponent,
    PersonUpdateComponent,
    PersonDeleteComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'persons', component: PersonComponent },
      { path: 'persons/create', component: PersonCreateComponent },
      { path: 'persons/:id', component: PersonDetailComponent },
      { path: 'persons/:id/update', component: PersonUpdateComponent },
      { path: 'persons/:id/delete', component: PersonDeleteComponent },
      { path: 'upload', component: UploadComponent }
    ])
  ],
  providers: [PersonService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
