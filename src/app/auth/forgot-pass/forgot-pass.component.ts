import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private auth: AngularFireAuth, private route: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  resetPass(email: string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
      this.notificationService.openSnackBar(false,
        "E-mail enviado! Para concluir o processo, siga as instru├º├Áes!")
    })
    .catch(error => {
      if (error.code == "auth/user-not-found")
        this.notificationService.openSnackBar(false, "E-mail n├úo encontrado!")
      else
        this.notificationService.openSnackBar(false, error.message)
    });
    this.emailFormControl.reset();
  }

}
