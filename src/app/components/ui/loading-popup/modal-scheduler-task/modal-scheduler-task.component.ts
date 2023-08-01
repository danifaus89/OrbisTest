import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-scheduler-task',
  templateUrl: './modal-scheduler-task.component.html',
  styleUrls: ['./modal-scheduler-task.component.scss'],
})
export class ModalSchedulerTaskComponent implements OnInit {
  @Input()
  id: number = 0;

  @Input()
  type: number = 0;

  @Input()
  tasks: any;

  @Input()
  weekday: any;
  @Input()
  limitP: any;

  @Input()
  task = {
    id: -1,
    user: '',
    active: 1,
    group: 0,
    type: 1,
    maxPower: 0,
    priority: 1,
    solarPriority: 0,
    initTime: {
      day: 0,
      month: 0,
      weekday: 0,
      timeList: [
        {
          hourMin: 0,
          duration: 60,
        },
      ],
    },
  };

  initTime!: string;
  endTime!: string;

  successMessage = false;
  error: string = '';



  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.task.type = this.type;
    this.task.initTime.weekday = this.weekday;

    this.initTime = this.getTimeFromMinutes(
      this.task.initTime.timeList[0].hourMin
    );
    this.endTime = this.getTimeFromMinutes(
      this.task.initTime.timeList[0].hourMin +
        this.task.initTime.timeList[0].duration
    );
    console.log(this.initTime);
    console.log(this.endTime);
  }

  getTimeFromMinutes(minutes: number) {
    let h = Math.floor(minutes / 60).toString();
    let m = (minutes % 60).toString();

    if (m.length < 2) m = '0' + m;
    if (h.length < 2) h = '0' + h;

    return h + ':' + m;
  }

  close() {
    this.activeModal.dismiss();
  }

  saveTask() {

    let iT = this.getMinutesFromTime(this.initTime);
    let eT = this.getMinutesFromTime(this.endTime);

    this.task.initTime.timeList[0].hourMin = iT;
    this.task.initTime.timeList[0].duration = eT - iT;

    if (iT < eT) {
      if (this.task.initTime.timeList[0].duration < 0)
        this.task.initTime.timeList[0].duration =
          1440 + this.task.initTime.timeList[0].duration;

      if (this.task.id == -1) this.task.id = this.id;

      this.task.maxPower = parseInt(this.task.maxPower.toString());
      this.activeModal.close(this.task);

    } else {
      this.error = 'La hora fin no puede ser menor a la de inicio';
      this.successMessage = false;
    }
  }

  getMinutesFromTime(time: any) {
    let h = time.split(':')[0];
    let m = time.split(':')[1];

    return parseInt(m) + h * 60;
  }

  checkPriority(task: any) {
    task.maxPower = parseInt(task.maxPower);
    if (task.maxPower == 0) task.solarPriority = 0;
    if (task.maxPower >= this.limitP) {
      task.maxPower = this.limitP;
      task.solarPriority = 1;
    }
    if (
      (task.maxPower != 0 && task.solarPriority == 0) ||
      (task.maxPower < this.limitP && task.solarPriority == 1)
    )
      task.solarPriority = 2;
  }
}
