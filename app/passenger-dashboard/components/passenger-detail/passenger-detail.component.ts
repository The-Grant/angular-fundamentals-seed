import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component ({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checkedIn]="detail.checkedIn"></span>

      <div *ngIf="editing" >
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name
        >
      </div>
      <div *ngIf="!editing">
        {{ detail.fullname }}
      </div>
      <button (click)="toggleEditing()">
        {{editing ? 'Done' : 'Edit'}}
      </button>
      <button (click)="removePassenger()">Remove</button>
      <button (click)="goToPassenger()">View</button>
      <div class="date">
        Check-in Date:
        {{ detail.checkedInDate ? (detail.checkedInDate | date: 'yMMMd') : 'NA' }}
      </div>
    </div>
  `
})
export class PassengerDetailComponent implements OnChanges{
  constructor(){}
  @Input()
  detail: Passenger;

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  editing: boolean = false;

  ngOnChanges(changes){
    if(changes.detail)
    {
      this.detail = Object.assign({},changes.detail.currentValue)
    }
  }

  onNameChange(value: string){
    this.detail.fullname=value;
  }

  toggleEditing(){
    if(this.editing)
      this.edit.emit(this.detail)
    this.editing = !this.editing;
  }

  removePassenger(){
    this.remove.emit(this.detail);
  }

  goToPassenger()
  {
    this.view.emit(this.detail);
  }
}
