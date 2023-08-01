import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import {
  Device,
  DeviceInfo,
  DevicePowerParams,
} from '../../shared/interfaces/device.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  conectorsInfo: Device[] = [];
  deviceInfo: DeviceInfo;
  devicePowerParams: DevicePowerParams;

  constructor(private devS: DeviceService) {}

  ngOnInit(): void {
    this.initModules();
  }

  initModules() {
    this.devS.getModulesByDevice('EEV482565as').subscribe((data) => {
      this.deviceInfo = data[0].stat;
      this.devicePowerParams = data[2].stat;
    });
    this.devS.getElemDevice('EEV482565as').subscribe((data) => {
      this.conectorsInfo = data;
    });
  }
}
