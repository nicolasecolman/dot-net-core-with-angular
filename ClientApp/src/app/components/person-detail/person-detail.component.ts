import { Component, OnInit } from '@angular/core';

import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  public person: Person;

  constructor(private _personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this._personService.getPerson(Number(id)).subscribe( p => {
      this.person = p;
    })
  }

}
