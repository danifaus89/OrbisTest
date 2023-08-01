import { Component, Input, OnInit } from '@angular/core';
import { Device, DeviceInfo } from 'src/app/shared/interfaces/device.interface';

@Component({
  selector: 'app-card-device',
  templateUrl: './card-device.component.html',
  styleUrls: ['./card-device.component.css'],
})
export class CardDeviceComponent implements OnInit {
  @Input() device: DeviceInfo;

  ngOnInit(): void {
  }
}
