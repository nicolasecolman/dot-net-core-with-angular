import { Component, OnInit } from '@angular/core';

import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  public persons: Person[];

  constructor(private _personService: PersonService) { }

  ngOnInit() {
    this._personService.getPersons().subscribe( result => {
      this.persons = result;
    });
  }

}
