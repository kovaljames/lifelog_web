import {
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormGroup
} from '@angular/forms';

export class CustomValidators {
  constructor() {}

  static onlyChar(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z ]*$');
      if (re.test(control.value)) {
          return null;
      } else {
          return { onlyChar: true };
      }
      };
  }
  static mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
      return (formGroup: AbstractControl):{ [key: string]: any } | null => {
          const control = formGroup.get(controlName);
          const matchingControl = formGroup.get(matchingControlName);

          if (!control || !matchingControl) {
              return null;
          }

          if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
              return null;
          }

          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
              return { passwordMismatch: true }
          } else {
              matchingControl.setErrors(null);
              return null;
          }
      };
  }
}
