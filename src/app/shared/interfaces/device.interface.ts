export interface Device {
  serial: string;
  name: string;
  firmware: string;
  modules: any[];
  elements: any[];
}

export interface DeviceInfo extends Device{
  version_fimware: string;
  version_hardware: string;
  potencia_maxima: number;
  limite_potencia: number;
  numero_conectores: number;
  direccion_mac: string;
  propietario: string;
  modelo: string;
}

export interface DevicePowerParams extends Device{
  consumo_casa: number;
  consumo_coche1: number;
  consumo_coche2: number;
  consumo_total: number;
  generacion_solar: number;
  generacion_red_electrica: number;
  consumo_por_fases_casa: string[];
  consumo_por_fases_coche1: string[];
  consumo_por_fases_coche2: string[];
  consumo_por_fases_total: string[];
  generacion_por_fases_solar: string[];
  generacion_por_fases_red_electrica: string[];
  timestamp: string;
}
