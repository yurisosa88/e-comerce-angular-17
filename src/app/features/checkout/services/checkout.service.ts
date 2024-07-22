import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Product } from "@shared/models/product.interface";
import { loadStripe } from "@stripe/stripe-js";
import { environment } from "environments/environment";
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class CheckoutService{
    private readonly _http = inject(HttpClient);
    private readonly _url = environment.serverUrl;

    onProceedToPay(products:Product[]):any{
        console.log('Pagandoooo')
        this._http.post<any>(`${this._url}/checkout`, { items: products }).pipe(
            map( async (res:any) => {
                const stripe = await loadStripe(environment.stripeAPIKey);
                stripe?.redirectToCheckout({ sessionId: res.id })
            })
        ).subscribe({
            error: (error) => console.error('Error', error)
        })
    }
}