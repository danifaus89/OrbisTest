import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './pages/settings/settings.component';
import { AllSettingsComponent } from './pages/settings/all-settings/all-settings.component';
import { ConnectivityComponent } from './pages/settings/connectivity/connectivity.component';
import { ChargeSchedulerComponent } from './pages/settings/charge-scheduler/charge-scheduler.component';
import { WifiComponent } from './pages/settings/wifi/wifi.component';
import { EthernetComponent } from './pages/settings/ethernet/ethernet.component';
import { MyResetComponent } from './pages/settings/reset/reset.component';

import { LoadingPopupComponent } from './components/ui/loading-popup/loading-popup.component';
import { ModalSchedulerTaskComponent } from './components/ui/loading-popup/modal-scheduler-task/modal-scheduler-task.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardDeviceComponent } from './components/card-device/card-device.component';
import { CardPowerParamsComponent } from './components/card-power-params/card-power-params.component';
import { FormsModule } from '@angular/forms';
import { CardConectorComponent } from './components/card-conector/card-conector.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    AllSettingsComponent,
    ConnectivityComponent,
    ChargeSchedulerComponent,
    WifiComponent,
    EthernetComponent,
    MyResetComponent,
    LoadingPopupComponent,
    ModalSchedulerTaskComponent,
    HomeComponent,
    NavbarComponent,
    CardDeviceComponent,
    CardPowerParamsComponent,
    CardConectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
