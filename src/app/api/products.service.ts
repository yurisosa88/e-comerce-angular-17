import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { map, tap } from "rxjs";
import { Product } from "@shared/models/product.interface";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    public products = signal<Product[]>([]);
    private readonly _http = inject(HttpClient);
    private readonly _endpoint = environment.apiUrl;
    private readonly _injector = inject(EnvironmentInjector);

    constructor(){
        this.getProducts();
    }

    //get products
    public getProducts():void {
        this._http.get<Product[]>(`${this._endpoint}/products?sort=desc`)
        .pipe( 
            map( 
                (products:Product[]) => products.map( (product:Product) => ({...product, qty: 1}) )
                ),
            tap( (data:Product[]) => this.products.set(data) )
         )
         .subscribe();
    }

    //get product by id
    public getProductById(id:number){
        const productDetail$ = this._http.get<Product>(`${this._endpoint}/products/${id}`)
        return toSignal<Product>(productDetail$,{injector:this._injector});
        //return runInInjectionContext(this._injector, () => 
        //toSignal<Product>(this._http.get<Product>(`${this._endpoint}/products/${id}`)))
    }
}