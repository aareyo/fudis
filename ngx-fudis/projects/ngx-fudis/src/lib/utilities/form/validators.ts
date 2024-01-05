import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export type FudisValidatorMessage = Observable<string> | string;

export interface FudisValidationErrors extends ValidationErrors {
  [key: string]: { message: FudisValidatorMessage; value?: unknown } | null;
}

export interface FudisValidatorFn extends ValidatorFn {
  (control: AbstractControl): FudisValidationErrors | null;
}

/**
 * Form Control Validators
 */

export const FudisValidators = {
  required,
  email,
  maxLength,
  minLength,
  max,
  min,
  pattern,
};

/**
 * Fudis version of Validators.required
 */
function required(message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.required(control)) {
      return null;
    }
    return { required: { message } };
  };
}

/**
 * Fudis version of Validators.email
 */
function email(message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.email(control)) {
      return null;
    }
    return { email: { message } };
  };
}

/**
 * Fudis version of Validators.maxLength
 */
function maxLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.maxLength(length)(control) || length < 1) {
      return null;
    }
    return { maxlength: { message, requiredLength: length } };
  };
}

/**
 * Fudis version of Validators.minLength
 */
function minLength(length: number, message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.minLength(length)(control) || length < 1) {
      return null;
    }
    return {
      minlength: {
        message,
        requiredLength: length,
      },
    };
  };
}

/**
 * Fudis version of Validators.min
 */
function min(minValue: number, message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.min(minValue)(control)) {
      return null;
    }
    return {
      min: {
        message,
        min: minValue,
      },
    };
  };
}

/**
 * Fudis version of Validators.max
 */
function max(maxValue: number, message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.max(maxValue)(control)) {
      return null;
    }
    return {
      max: {
        message,
        max: maxValue,
      },
    };
  };
}

/**
 * Fudis version of Validators.pattern
 */
function pattern(regex: string | RegExp, message: FudisValidatorMessage): FudisValidatorFn {
  return (control: AbstractControl) => {
    if (!Validators.pattern(regex)(control)) {
      return null;
    }

    return {
      pattern: {
        message,
      },
    };
  };
}
