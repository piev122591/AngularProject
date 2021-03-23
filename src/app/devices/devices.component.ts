import { Component, OnInit } from '@angular/core';
import { IDevices } from './devices';
import { DevicesService } from './devices.service';
@Component({
  selector: 'pm-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  pageTitle = 'Devices List';
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDevices = this.listFilter ? this.performFilter(this.listFilter) : this.devices;
  }

  filteredDevices: IDevices[] = [];
  devices: IDevices[] = [];


  performFilter(filterBy: string): IDevices[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.devices.filter((device: IDevices) =>
    device.DeviceModel.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private devicesService: DevicesService) { }

  ngOnInit(): void {
    this.devicesService.getDevices().subscribe({
      next: devices => {
        this.devices = devices;
        this.filteredDevices = this.devices;
      },
      error: err => this.errorMessage = err
    });
  }

}
