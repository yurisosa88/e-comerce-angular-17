import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe,SlicePipe,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  productCard = input.required<Product>();
  @Output() addProductToCartEvent = new EventEmitter<Product>;

  addProductToCart() {
    this.addProductToCartEvent.emit(this.productCard());
  }
}
