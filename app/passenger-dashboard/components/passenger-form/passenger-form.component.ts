import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template:
  `
    <form (ngSubmit)="handelSubmit(form.value, form.valid)" #form="ngForm">
      {{detail | json}}
      <div>
        Passenger Name
        <input
          type="String"
          name="fullname"
          required
          #fullname="ngModel"
          [ngModel]="detail?.fullname">
          <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
            Name is required
          </div>
      </div>
      <div>
        Passenger ID
        <input
          type="String"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id">
          <div *ngIf="id.errors?.required && id.dirty" class="error">
          ID is required
        </div>
      </div>
      <div>
        Checked In
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)">
        </label>
      </div>
      <div *ngIf="form.value.checkedIn">
        <input
          type="number"
          name="checkedInDate"
          [ngModel]="detail?.checkedInDate">
      </div>

      <div>
        <select
          name="baggage"
          [ngModel]="detail?.baggage">
            <option *ngFor="let item of baggage"
              [value]="item.key"
              [selected]="item.key === detail?.baggage">
                {{ item.value }}
              </option>

          </select>
      </div>

      <button type="submit" [disabled]="form.invalid">Submit</button>

      {{form.value | json}}
    </form>
  `
})

export class PassengerFormComponent {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] =[{
      key: 'none',
      value: 'No baggage'
    },
    {
      key: 'hand-only',
      value: 'Hand Baggage'
    },
    {
      key: 'hold-only',
      value: 'Hold Baggage'
    },
    {
      key: 'hand-hold',
      value: 'Hand & Hold Baggage'
    }
  ]


  toggleCheckIn(checkedIn: boolean)
  {
    if(checkedIn)
    {
      this.detail.checkedInDate = Date.now();
    }
  }

  handelSubmit(passenger: Passenger, valid: boolean)
  {
    if(valid)
    {
      this.update.emit(passenger);
    }
  }

}
