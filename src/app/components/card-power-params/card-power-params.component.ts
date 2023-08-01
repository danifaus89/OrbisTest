import { Component, Input, OnInit } from '@angular/core';
import { DevicePowerParams } from 'src/app/shared/interfaces/device.interface';

@Component({
  selector: 'app-card-power-params',
  templateUrl: './card-power-params.component.html',
  styleUrls: ['./card-power-params.component.css'],
})
export class CardPowerParamsComponent {
  dataConsumo: any;
  dataGenSolar: any;
  dataCF: any;
  dataGPF: any;
  options: any;

  @Input() device: DevicePowerParams;

  ngOnChanges() {
    this.initEnergyCards();
  }

  initEnergyCards(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    if (this.device) {
      let conFasTotal = this.parseElements(this.device.consumo_por_fases_total);
      let conFasCas = this.parseElements(this.device.consumo_por_fases_casa);
      let conFasCoch = this.parseElements(this.device.consumo_por_fases_coche1);
      let conFasCoch2 = this.parseElements(this.device.consumo_por_fases_coche2);
      let genFasRedElec = this.parseElements(this.device.generacion_por_fases_red_electrica);
      let genFasSol = this.parseElements(this.device.generacion_por_fases_solar);

      this.dataConsumo = {
        labels: ['Consumo casa', 'Consumo coche', 'Consumo coche 2'],
        datasets: [
          {
            data: [
              this.device.consumo_casa,
              this.device.consumo_coche1,
              this.device.consumo_coche2,
            ],
            backgroundColor: ['#01778b', '#00B2D1', '#00ECFF'],
            hoverBackgroundColor: ['#7D3C98'],
          },
        ],
      };
      this.dataGenSolar = {
        labels: ['Generación solar', 'Generación red eléctrica'],
        datasets: [
          {
            data: [
              this.device.generacion_solar,
              this.device.generacion_red_electrica,
            ],
            backgroundColor: ['#FFC300', '#FF5733'],
            hoverBackgroundColor: ['#C70039'],
          },
        ],
      };
      this.dataCF = {
        labels: [
          'Cons. fase Total',
          'Cons. fase Casa',
          'Cons. fase Coche',
          'Cons. fase Coche 2',
        ],
        datasets: [
          {
            data: [conFasTotal[0], conFasCas[0], conFasCoch[0], conFasCoch2[0]],
            backgroundColor: ['#FFC300', '#FF5733', '#C70039', '#900C3F'],
            hoverBackgroundColor: ['#7D3C98'],
          },
          {
            data: [conFasTotal[1], conFasCas[1], conFasCoch[1], conFasCoch2[1]],
            backgroundColor: ['#FFC300', '#FF5733', '#C70039', '#900C3F'],
            hoverBackgroundColor: ['#7D3C98'],
          },
          {
            data: [conFasTotal[2], conFasCas[2], conFasCoch[2], conFasCoch2[2]],
            backgroundColor: ['#FFC300', '#FF5733', '#C70039', '#900C3F'],
            hoverBackgroundColor: ['#7D3C98'],
          },
        ],
      };
      this.dataGPF = {
        labels: [
          'Generación por fases red eléctrica',
          'Generación por fases solar',
        ],
        datasets: [
          {
            data: [genFasRedElec[0], genFasSol[0]],
            backgroundColor: ['#01778b', '#00B2D1'],
            hoverBackgroundColor: ['#7D3C98'],
          },
          {
            data: [genFasRedElec[1], genFasSol[1]],
            backgroundColor: ['#01778b', '#00B2D1'],
            hoverBackgroundColor: ['#7D3C98'],
          },
          {
            data: [genFasRedElec[2], genFasSol[2]],
            backgroundColor: ['#01778b', '#00B2D1'],
            hoverBackgroundColor: ['#7D3C98'],
          },
        ],
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
      };
    }
  }
  parseElements(element: any) {
    let newValue = element
      .slice(1)
      .slice(0, element.length - 2)
      .split(',');
    return newValue;
  }
}
