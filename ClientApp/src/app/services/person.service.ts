import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Person } from '../models/person';
import { getBaseUrl } from '../../main';

@Injectable()
export class PersonService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    this.baseUrl += 'api/Person';
  }

  public getPersons(): Observable<Person[]>
  {
    return this.http.get<Person[]>(this.baseUrl);
  }

  public getPerson(id: number) {
    return this.http.get<Person>(this.baseUrl + '/' + id);
  }

  public postPerson(person: Person) {
    return this.http.post<Person>(this.baseUrl, person);
  }

  public putPerson(person: Person) {
    return this.http.put<Person>(this.baseUrl + '/' + person.id, person);
  }

  public deletePerson(id: number) {
    return this.http.delete<Person>(this.baseUrl + '/' + id);
  }

}
