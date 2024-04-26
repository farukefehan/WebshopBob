import { Component } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductsModule } from '../products/products.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends ProductsModule{
  
}
