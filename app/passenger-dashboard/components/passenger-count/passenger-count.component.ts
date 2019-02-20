import { Component, Input } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { ThrowStmt } from '@angular/compiler/src/output/output_ast';


@Component ({
  selector: 'passenger-count',
  template: `
    <div>
      <h3>Airline Passengers</h3>
      Checked In Passengers: {{ checkedInCount() }} / {{ items?.length }}
    </div>

  `
})
export class PassengerCountComponent{
  @Input()
  items: Passenger[];

  checkedInCount(): number {
    if(!this.items) return;
    return this.items.filter((passenger: Passenger) => {
      return passenger.checkedIn;
    }).length;

  }

}
