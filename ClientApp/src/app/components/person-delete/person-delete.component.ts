import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit {
  public person: Person;

  constructor(private _personService: PersonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this._personService.getPerson(Number(id)).subscribe( p => {
      this.person = p;
    })        
  }

  onSubmit() {
    this._personService.deletePerson(this.person.id).subscribe( p => {
      this.router.navigateByUrl('persons');
    });
  }  
}
