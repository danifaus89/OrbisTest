import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingPopupComponent } from 'src/app/components/ui/loading-popup/loading-popup.component';
import { DeviceService } from 'src/app/services/device.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.scss'],
})
export class ConnectivityComponent implements OnInit {
  device = '';

  loading = false;

  @Input()
  allSettings = false;

  body: any = {};

  originalData: any;
  changesMade = false;
  successMessage: boolean = false;
  error: string = '';
  modalLoad: NgbModalRef | undefined;

  constructor(
    public _dService: DeviceService,
    private _aRoute: ActivatedRoute,
    private _modal: ModalService
  ) {}

  ngOnInit(): void {
    this._aRoute.parent?.parent?.params.subscribe(
      (params: Params) => (this.device = params['serial'])
    );

    this._dService.getModuleInfo('network').subscribe((data) => {
      console.log(data);
      this.body.staEssid = data.cfg?.staEssid;
      this.body.staPasswd = '*****';
      if (!data.cfg) this.body.staPasswd = '';
      this.originalData = { ...this.body };
    });
  }

  save() {
    this.modalLoad = this._modal.open(LoadingPopupComponent);

    console.log((this.body));
    this._dService.setModuleCfg(this.body, 'network').subscribe(
      (data) => {
        console.log(data);
        this.modalLoad?.close();
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 10000);
      },
      (err) => {
        setTimeout(() => {
          this.error = '';
          this.error = err.message;
          this.successMessage = false;
          this.modalLoad?.close();
        }, 5000);
      }
    );
  }
}
