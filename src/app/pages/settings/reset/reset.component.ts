import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { LoadingPopupComponent } from 'src/app/components/ui/loading-popup/loading-popup.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class MyResetComponent implements OnInit {

  device='';

  @Input()
  allSettings=false;

  successMessage: boolean = false;
  error: string = '';
  modalLoad: NgbModalRef | undefined;

  lastType='';

  constructor(public _dService: DeviceService, private _aRoute: ActivatedRoute, private _modal: ModalService) { }

  ngOnInit(): void {
    this._aRoute.parent?.parent?.params
    .subscribe((params: Params) => this.device = params['serial']);
  }

  reset(type: any){
    if(type=="hard")
      var text = '¿Está seguro que desea reiniciar el cargador?';
    else
      var text = '¿Está seguro que desea restaurar el cargador? Esto borrará su configuración y restablecerá el equipo a los valores de fábrica';
    if (confirm(text)) {
      this.modalLoad=this._modal.open(LoadingPopupComponent);

      this.lastType = type;

      this._dService.reset(type)
        .subscribe((data:any)=>{
          console.log(data);
          this.modalLoad?.close();
          this.successMessage=true;
          setTimeout(() => {
            this.successMessage=false;
          }, 10000);
        }, (err:any)=>{
          console.error(err)
          this.error=err.message;
          setTimeout(() => {
            this.error='';
          }, 10000);
          this.modalLoad?.close();
        })
    }
  }
}
