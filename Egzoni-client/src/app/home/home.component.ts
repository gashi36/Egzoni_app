import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Correct import for Angular Router
import { GetBrandsGQL, GetCategoriesGQL } from '../../generated/graphql';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Correct property name is 'styleUrls'
})
export class HomeComponent {
  constructor(private router: Router) {}
}
