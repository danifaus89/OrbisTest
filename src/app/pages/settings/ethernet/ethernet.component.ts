import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingPopupComponent } from 'src/app/components/ui/loading-popup/loading-popup.component';
import { DeviceService } from 'src/app/services/device.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-ethernet',
  templateUrl: './ethernet.component.html',
  styleUrls: ['./ethernet.component.scss']
})
export class EthernetComponent implements OnInit {

  @Input()
  allSettings=false;

  device: string = '';

  successMessage: boolean = false;
  error: string= '';

  body: any = {};

  originalData: any;
  changesMade=false;
  modalLoad: NgbModalRef | undefined;

  constructor(private _aRoute: ActivatedRoute, public _dService: DeviceService, private _modal: ModalService) { }

  ngOnInit(): void {
    this._aRoute.parent?.parent?.params
    .subscribe((params: Params) => this.device = params['serial']);

    this._dService.getModuleInfo('network')
      .subscribe((data: any)=>{
        console.log(data);
        this.body.ethipstatic=data.cfg?.ethipstatic;
        this.body.ethmask=data.cfg?.ethmask;
        this.body.ethgw=data.cfg?.ethgw;
        this.body.ethdns=data.cfg?.ethdns;
        this.body.ethDhcpen=!!data.cfg?.ethDhcpen;
        //this.body.staPasswd=data.cfg.staPasswd;
        this.originalData={ ...this.body };
      })
  }

  save(){
    this.modalLoad=this._modal.open(LoadingPopupComponent);

    this.body.ethDhcpen = this.body.ethDhcpen ? 1 : 0;
    this._dService.setModuleCfg(this.body, 'network')
      .subscribe((data:any)=>{
        console.log(data);
        this.modalLoad?.close();
        this.successMessage=true;
        setTimeout(() => {
          this.successMessage=false;
        }, 10000);
      }, (err: any)=>{
        this.error=err.message;
        setTimeout(() => {
          this.error='';
        }, 10000);
        this.modalLoad?.close();
      })
  }


}
