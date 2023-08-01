import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal, private _toastr: ToastrService) { }

  public open(content: any, options = {}) {
    return this.modalService.open(content, { ...options, centered: true });
  }

  showSuccess(title: string, text: string) {
    this._toastr.success(text, title);
  }

  showWarn(title: string, text: string) {
    this._toastr.warning(text, title);
  }
}
