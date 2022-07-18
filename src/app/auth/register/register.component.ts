import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/providers/custom-validators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  snackSub: Subscription = new Subscription()
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    },

    CustomValidators.mustMatch('password', 'confirmPassword') // insert here
  );

  constructor(
    private auth: AngularFireAuth,
    private route: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  async register(email: string, password: string) {
    if (this.registerForm.invalid)
      return
    
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        if (data.user) {
          data.user.sendEmailVerification() // send verification mail

          this.registerForm.reset()

          const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = 
            this.notificationService.openSnackBarThenReturnRef(
              true,
              "Cadastro efetuado com sucesso!" +
              " Um link de confirma├º├úo foi enviado para o seu e-mail!",
              "OK");
          
          this.snackSub = snackBarRef.afterDismissed().subscribe(info => {
            if (info.dismissedByAction === true) { this.route.navigateByUrl('/login') }
          });
        }
        else
          this.route.navigateByUrl('/register')
      })
      .catch(error => {
        if (error.code == 'auth/weak-password') {
          this.notificationService.openSnackBar(false, "Senha muito fraca!")
        }
        else if (error.code == "auth/email-already-in-use")
        {
          this.notificationService.openSnackBar(false, "E-mail j├í est├í em uso!")
        } else {
          this.notificationService.openSnackBar(false, error.message)
        }
      });
  }

  ngOnDestroy(): void {
    this.snackSub.unsubscribe();
  }

}
