import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoadingPopupComponent } from 'src/app/components/ui/loading-popup/loading-popup.component';
import { ModalSchedulerTaskComponent } from 'src/app/components/ui/loading-popup/modal-scheduler-task/modal-scheduler-task.component';
import { DeviceService } from 'src/app/services/device.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-charge-scheduler',
  templateUrl: './charge-scheduler.component.html',
  styleUrls: ['./charge-scheduler.component.scss'],
})
export class ChargeSchedulerComponent implements OnInit {
  tasks: any = { timeTasks: {}, powerTasks: { weekday: [], weekend: [] } };
  originalTasks: any = {};
  powerTasks: any = { weekday: [], weekend: [] };

  modalAdd: NgbModalRef | undefined;
  newTaskId: number = 0;

  @Input()
  allSettings = false;

  @Input()
  connectors: { name: string }[] = [];

  modalLoad: NgbModalRef | undefined;

  successMessage: boolean = false;
  error: string = '';

  constructor(
    public _dService: DeviceService,
    private _aRoute: ActivatedRoute,
    private _modal: ModalService,
    public _utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.powerTasks = { weekday: [], weekend: [] };

    setTimeout(() => {
      this.connectors.forEach((conn) => {
        this._dService
          .getElementModule('schedman', conn.name)
          .subscribe((data) => {
            let t = JSON.parse(data.cfg.tasks);
            console.log(this.tasks);

            t = t.filter((task: { type: number }) => task.type == 0);
            t = t.sort(
              (
                t1: { initTime: { timeList: { hourMin: number }[] } },
                t2: { initTime: { timeList: { hourMin: number }[] } }
              ) =>
                t1.initTime.timeList[0].hourMin -
                t2.initTime.timeList[0].hourMin
            );
            this.tasks['timeTasks'][conn.name] = t;

            t = JSON.parse(data.cfg.tasks);
            t = t.filter((task: { type: number }) => task.type == 1);
            t = t.sort(
              (
                t1: { initTime: { timeList: { hourMin: number }[] } },
                t2: { initTime: { timeList: { hourMin: number }[] } }
              ) =>
                t1.initTime.timeList[0].hourMin -
                t2.initTime.timeList[0].hourMin
            );

            this.tasks['powerTasks'][conn.name] = {};
            this.tasks['powerTasks'][conn.name]['weekday'] =
              t.filter(
                (ta: { initTime: { weekday: number } }) =>
                  ta.initTime.weekday == 62
              ) || [];
            this.powerTasks['weekday'] = this.powerTasks['weekday'].concat(
              t.filter(
                (ta: { initTime: { weekday: number } }) =>
                  ta.initTime.weekday == 62
              )
            );
            this.tasks['powerTasks'][conn.name]['weekend'] =
              t.filter(
                (ta: { initTime: { weekday: number } }) =>
                  ta.initTime.weekday == 65
              ) || [];
            this.powerTasks['weekend'] = this.powerTasks['weekend'].concat(
              this.tasks['powerTasks'][conn.name]['weekend']
            );

            this.newTaskId = this.getFreeIdFromTasks();

            console.log(this.tasks);

            this.successMessage = false;
            this.error = '';
          });
      });
    }, 500);
  }

  openAddTask(cName: string | number) {
    this.modalAdd = this._modal.open(ModalSchedulerTaskComponent);
    this.modalAdd.componentInstance.id = this.newTaskId;
    this.modalAdd.componentInstance.type = 0;
    this.modalAdd.componentInstance.weekday = 0;

    this.modalAdd.result.then(
      (task) => {
        this.tasks['timeTasks'][cName].push(task);
        console.log(this.tasks['timeTasks']);
        this.newTaskId = this.getFreeIdFromTasks();
      },
      (reason) => {
        // on dismiss
      }
    );
  }

  getFreeIdFromTasks() {
    let idTaskDisp = 1;
    let found = false;

    let ids: any[] = [];

    this.powerTasks['weekday'].forEach((t: { id: any }) => {
      ids.push(t.id);
    });

    this.powerTasks['weekend'].forEach((t: { id: any }) => {
      ids.push(t.id);
    });

    this.connectors.forEach((element) => {
      if (this.tasks['timeTasks'][element.name])
        this.tasks['timeTasks'][element.name].forEach((t: { id: any }) => {
          ids.push(t.id);
        });
    });

    console.log(ids);

    while (!found) {
      if (ids.includes(idTaskDisp)) idTaskDisp++;
      else found = true;
    }

    console.log('NEW ID: ' + idTaskDisp);
    return idTaskDisp;
  }

  save(element: string) {
    let t = [...this.tasks['powerTasks'][element]['weekday']];
    this.modalLoad = this._modal.open(LoadingPopupComponent);
    t = t.concat(this.tasks['powerTasks'][element]['weekend']);
    console.log(this.tasks['timeTasks'][element]);
    t = t.concat(this.tasks['timeTasks'][element]);
    console.log(t);

    this.saveConfig(element, t);
  }

  saveConfig(element: string, tasks: any) {
    this._dService.setModuleElement('schedman', { tasks }, element).subscribe(
      (data: any) => {
        this.successMessage = true;
        this.modalLoad?.close();
        setTimeout(() => {
          this.successMessage = false;
        }, 10000);
      },
      (err: { message: any }) => {
        console.error(err);
        this.error = err.message;
        this.modalLoad?.close();
        setTimeout(() => {
          this.error = '';
        }, 10000);
      }
    );
  }

  deleteTask(id: any, element: string | number) {
    var data = {
      tasks: [{ id, type: 0 }],
    };

    this.tasks['timeTasks'][element] = this.tasks['timeTasks'][element].filter(
      (t: { id: any }) => t.id != id
    );
  }

  openEditTask(task: any) {
    let t = { ...task };
    this.modalAdd = this._modal.open(ModalSchedulerTaskComponent);
    this.modalAdd.componentInstance.type = 0;
    this.modalAdd.componentInstance.task = task;

    this.modalAdd.result.then(
      (task) => {
        console.log(task);
      },
      (reason) => {
        task = t;
      }
    );
  }
}
