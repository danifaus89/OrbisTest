import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Device } from '../shared/interfaces/device.interface';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly deviceUrl = 'assets/device.json';

  constructor(private http: HttpClient) {}

  getElemDevice(serial: string) {
    return this.http
      .get<Device>(this.deviceUrl)
      .pipe(map((device: Device) => device.elements));
  }

  getModulesByDevice(serial: string) {
    return this.http
      .get<Device>(this.deviceUrl)
      .pipe(map((device: Device) => device.modules));
  }

  getModuleInfo(module: string, command?: string) {
    return this.http.get<Device>(this.deviceUrl).pipe(
      map((device: Device) => {
        if (!command || command == 'all')
          return device.modules.find((m) => m.topic_name === module);
        else
          return device.modules.find((m) => m.topic_name === module)[command];
      })
    );
  }

  getElementModule(module: string, element: string) {
    return this.http.get<Device>(this.deviceUrl).pipe(
      map((device: Device) => {
        return device.modules
          .find((m) => m.topic_name === module)
          .elements.find((e: { name: string }) => e.name === element).data;
      })
    );
  }

  checkChangesSettings(originalBody: any, actualBody: any) {
    if (JSON.stringify(originalBody) == JSON.stringify(actualBody)) {
      return false;
    } else {
      return true;
    }
  }

  setModuleCfg(body: any, module: string) {
    return this.http.post<Device>(this.deviceUrl, body);
  }

  setModuleElement(module: string, body: any, element: string) {
    return this.http.post<Device>(this.deviceUrl, body);
  }

  reset(type: any) {
    return this.http.post<Device>(this.deviceUrl, type);
  }
}
