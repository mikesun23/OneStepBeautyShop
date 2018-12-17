import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormConvertorService {

  resultForm: FormGroup;
  constructor(private fb: FormBuilder = new FormBuilder()) { }

  
  convertObjectToForm(obj: any): FormGroup {
    const res: AbstractControl = this.convertObjectToFormHelper(obj);
    
    if (res instanceof FormControl || res instanceof FormArray) {
      return this.fb.group(res);
    } else {
      return res as FormGroup;
    }
  }
  
  // recursively convert all the object attributes/properties/fields into FormGroupo(object)
  // TODO: could do it cleaner with two functions, one wrapper, one helper, in that case
  // we can add error handling. 
  convertObjectToFormHelper(obj: any): FormControl | FormArray | FormGroup {

    if (typeof obj == 'string' || typeof obj == 'number' || typeof obj == 'boolean') {
      // if object is above types
      return this.fb.control('');

    } else if (obj instanceof Array) {
      return this.fb.array([]);

    } else if (obj instanceof Object) {
      // if object is Object type

      let resFormGroup: FormGroup = this.fb.group({});
      Object.keys(obj).forEach(key => {
        let newControl: AbstractControl = this.convertObjectToFormHelper(obj[key]);
        resFormGroup.addControl(key, newControl);
      })
      return resFormGroup;
    }
  }



}
