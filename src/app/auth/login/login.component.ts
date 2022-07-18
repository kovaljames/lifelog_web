import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { NotificationService } from '../../services/notification.service';

const googleLogoURL = 
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private auth: AngularFireAuth, private route: Router,
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
  }

  ngOnInit(): void {
  }

  socialLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        if (data)
          this.route.navigateByUrl('/');
        else
          this.route.navigateByUrl('/login')
      })
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.notificationService.openSnackBar(false,
            "Essa conta j├í existe ligada a outro servi├ºo!")
        } else {
          this.notificationService.openSnackBar(false, error.message)
        }
      });
  }

  login(email: string, password: string) {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid)
      return;
    
    this.auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        if (data.user && data.user.emailVerified)
          this.route.navigateByUrl('/');
        else {
          this.auth.signOut().then(() => {
            this.notificationService.openSnackBar(false,
              "Verifique a sua conta atrav├®s do e-mail que foi enviado anteriormente!",
              "Reenviar?")
          })
        }
      })
      .catch(error => {
        if (error.code == "user-not-found"){
          this.notificationService.openSnackBar(false, "Usu├írio n├úo encontrado!")
        }
        else if (error.code == 'auth/wrong-password' || 'auth/wrong-email') {
          this.notificationService.openSnackBar(false, "Usu├írio ou senha inv├ílidos!")
        } else {
          this.notificationService.openSnackBar(false, error.message)
        }
      });
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted));
  }
}
