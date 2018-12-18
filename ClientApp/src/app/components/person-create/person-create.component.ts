import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  public person: Person;

  constructor(private _personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.person = new Person();
  }

  onSubmit() {
    this._personService.postPerson(this.person).subscribe( p => {
      this.router.navigateByUrl('persons/' + p.id);
    });
  }

}
