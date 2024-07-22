import { Component, inject } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  styleUrl: './products.component.scss',
  template: `
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap -m-4">
          @if (products()) {
            @for (product of products(); track product.id) {
            <app-card 
            class="width-35 p-4 lg:w-1/4 md:w-1/2" 
            [productCard]="product" (addProductToCartEvent)="addProductToCard($event)" />
          }  
          }         
        </div>
      </div>
    </section>
  `,
})
export default class ProductsComponent {
  private readonly productService = inject(ProductsService);
  products = this.productService.products;
  cartStore = inject(CartStore)

  addProductToCard(product:Product){
    console.log(product)
    this.cartStore.addToCart(product);
  }
}
