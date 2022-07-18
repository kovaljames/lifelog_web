import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
  public form: FormGroup
  public minDate: Date
  public maxDate: Date
  private subscription: any

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private router: Router,
    private auth: AngularFireAuth,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(160),
        Validators.required
      ])],
      dateInit: [new Date().toJSON(), Validators.required],
      dateEnd: [new Date().toJSON(), Validators.required],
      desc: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(1600)
      ])],
      user: ""
    })

    const currentYear = new Date().getFullYear()
    this.minDate = new Date()
    this.maxDate = new Date(currentYear + 1, 11, 31)
    this._locale = 'br'
    this._adapter.setLocale(this._locale)
  }

  ngOnInit(): void {
  }

  submit() {
    this.subscription = this.auth.idToken.subscribe(token => {
      if (token != null) {
        this.service.createTask(this.form.value, token)
          .subscribe(res => {
            this.router.navigateByUrl("/");
          })
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
