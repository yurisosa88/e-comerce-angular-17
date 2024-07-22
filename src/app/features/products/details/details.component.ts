import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit {
  //@Input({alias: 'id'}) productId!: number;
  productId = input<number>(0, {alias: 'id'} )
  private readonly productSvc = inject(ProductsService);
  private sanitizer = inject(DomSanitizer);
  productDetail!: Signal<Product | undefined>;
  starsArray: number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);

  ngOnInit(): void {
    this.productDetail = this.productSvc.getProductById(this.productId());
  }
  ngAfterViewInit(): void {
/*     this.cartStore.products().forEach( (product) => {
      if(product.id === (this.productDetail() as Product).id ) {
        (this.productDetail() as Product ).qty  = product.qty
      } else {
        (this.productDetail() as Product ).qty = 1
      }
    }) */
  }
  
  addProductToCart(){
    console.log(this.productDetail())
    this.cartStore.addToCart(this.productDetail() as Product)
  }

  generateSVG(index:number):SafeHtml{
    let svgContent = null;
    const rate = this.productDetail()?.rating.rate as number;

    if(index + 1 <= Math.floor(rate)){
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
      stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
      </path>
    </svg>`
    } else if(index < rate) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="partialFillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="50%" style="stop-color:currentColor; stop-opacity:1" />
          <stop offset="50%" style="stop-color:currentColor; stop-opacity:0" />
        </linearGradient>
      </defs>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#partialFillGradient)"></path>
    </svg>`
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      class="w-4 h-4 text-orange-500" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
      </path>
    </svg>`
    }
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }

}
