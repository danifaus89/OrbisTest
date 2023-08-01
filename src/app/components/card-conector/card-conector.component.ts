import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-conector',
  templateUrl: './card-conector.component.html',
  styleUrls: ['./card-conector.component.css']
})
export class CardConectorComponent {

  @Input() device: any;


}
