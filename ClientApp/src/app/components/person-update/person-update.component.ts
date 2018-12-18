import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.css']
})
export class PersonUpdateComponent implements OnInit {
  public person: Person;

  constructor(private _personService: PersonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this._personService.getPerson(Number(id)).subscribe( p => {
      this.person = p;
    })    
  }

  onSubmit() {
    this._personService.putPerson(this.person).subscribe( p => {
      this.router.navigateByUrl('persons/' + p.id);
    });
  }  

}
