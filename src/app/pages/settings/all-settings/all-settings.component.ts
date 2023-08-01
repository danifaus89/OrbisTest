import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-all-settings',
  templateUrl: './all-settings.component.html',
  styleUrls: ['./all-settings.component.scss']
})
export class AllSettingsComponent implements OnInit {
  selectedSetting = '';

  serial: string = '';
  modules: any[] = [];

  connectors: any;

  constructor(private _device: DeviceService, private _aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._aRoute.parent?.parent?.params
      .subscribe((params: Params) => this.serial = params['serial']);

    this._device.getModulesByDevice(this.serial)
      .subscribe(data => {
        console.log(data);
        data.forEach(module => {
          this.modules.push(module.topic_name);
        });
        console.log(this.modules)
      })
  
      this._device.getElemDevice(this.serial)
        .subscribe(data => {
          this.connectors=data;
          console.log(data)
        });
  }



}
