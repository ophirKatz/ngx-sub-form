import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { getObservableLifecycle, ObservableLifecycle } from 'ngx-observable-lifecycle';
import { subformComponentProviders } from 'ngx-sub-form';
import { AssassinDroid, AssassinDroidWeapon, DroidType } from 'src/app/interfaces/droid.interface';
import { createForm } from '../../../../../../../projects/ngx-sub-form/src/lib/new/ngx-sub-form';
import { FormType } from '../../../../../../../projects/ngx-sub-form/src/lib/new/ngx-sub-form.types';

export const ASSASSIN_DROID_WEAPON_TEXT: { [K in AssassinDroidWeapon]: string } = {
  [AssassinDroidWeapon.SABER]: 'Saber',
  [AssassinDroidWeapon.FLAME_THROWER]: 'Flame thrower',
  [AssassinDroidWeapon.GUN]: 'Gun',
  [AssassinDroidWeapon.AXE]: 'Axe',
};

@ObservableLifecycle()
@Component({
  selector: 'app-assassin-droid',
  templateUrl: './assassin-droid.component.html',
  styleUrls: ['./assassin-droid.component.scss'],
  providers: subformComponentProviders(AssassinDroidComponent),
})
export class AssassinDroidComponent {
  public AssassinDroidWeapon = AssassinDroidWeapon;

  public assassinDroidWeaponText = ASSASSIN_DROID_WEAPON_TEXT;

  public form = createForm<AssassinDroid>(this, {
    formType: FormType.SUB,
    formControls: {
      color: new FormControl(null, { validators: [Validators.required] }),
      name: new FormControl(null, { validators: [Validators.required] }),
      droidType: new FormControl(DroidType.ASSASSIN, { validators: [Validators.required] }),
      weapons: new FormControl([], { validators: [Validators.required] }),
    },
    componentHooks: {
      onDestroy: getObservableLifecycle(this).onDestroy,
    },
  });
}