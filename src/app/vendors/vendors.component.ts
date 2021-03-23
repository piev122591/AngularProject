import { Component, OnInit } from '@angular/core';
import { IVendor } from './vendor';
import { VendorService } from './vendor.service';

@Component({
  selector: 'pm-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  pageTitle = 'Vendor List';
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredVendor = this.listFilter ? this.performFilter(this.listFilter) : this.vendor;
  }

  filteredVendor: IVendor[] = [];
  vendor: IVendor[] = [];

  performFilter(filterBy: string): IVendor[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.vendor.filter((product: IVendor) =>
      product.CarrierName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private vendorService: VendorService) { }


ngOnInit(): void {
    this.vendorService.getVendor().subscribe({
next: vendor => {
  this.vendor = vendor;
  this.filteredVendor = this.vendor;
 },
 error: err => this.errorMessage = err
    });

  }

}
