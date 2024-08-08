import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-points',
  templateUrl: './sale-points.component.html',
  styleUrls: ['./sale-points.component.css'],
})
export class SalePointsComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 42.521707, lng: 21.122337 };
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };

  ngOnInit(): void {}

  getDirections(): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${this.center.lat},${this.center.lng}`;
    window.open(url, '_blank');
  }
}
