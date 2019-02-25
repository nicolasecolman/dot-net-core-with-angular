import { Component, OnDestroy, OnInit, Directive, HostListener, HostBinding, ElementRef, Input } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[disableDuringAjax]'
})
export class DisableButtonDuringAjax implements OnDestroy, OnInit {

  private ngUnsubscribe: Subject<any> = new Subject();

  @Input() formValid;

  subscription: Subscription;

  constructor(private _busyService: BusyService, private el: ElementRef) {
      console.log("COnstructor")
  }

  checkFormValidation(form)
  {
      if ((form.valid == true)) { console.log("Check AJAX PROG")
          this.checkAjaxProgress();
      }
      if ((form.valid == false)) { console.log("Form no valido")
          this.el.nativeElement.disabled = true;
      }
  }


  checkAjaxProgress()
  {
    
      this.subscription = this._busyService.busy$
      .takeUntil(this.ngUnsubscribe).subscribe(
          response => {




              if ((response == true)) {
                  this.el.nativeElement.disabled = true;
              }

              if ((response == false)) {
                  this.el.nativeElement.disabled = false;
              }

              // Check form one more time
              if ((this.formValid != null)) {
                  if ((this.formValid.valid == false)) {
                      this.el.nativeElement.disabled = true;
                  }
              }


          }
          );
  }

  ngOnInit() {

      // If there is no form to check validation then just check the ajax progress
      if ((this.formValid == null))
      {
          this.checkAjaxProgress();
      }
      // Else check the forms validation AND ajax progress
      else
      {
          this.checkFormValidation(this.formValid);
          this.formValid.valueChanges.takeUntil(this.ngUnsubscribe).subscribe(data => this.checkFormValidation(this.formValid));
      }

  }

  ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
  }

}