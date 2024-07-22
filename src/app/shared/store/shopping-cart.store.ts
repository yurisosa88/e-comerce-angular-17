import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/product.interface";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
    products: Product[];
    totalAmount: number;
    totalProducts: number;
}

const initialState: CartStore = {
    products: [],
    totalAmount: 0,
    totalProducts: 0
}

export const CartStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withComputed( ({products}) => ({
        totalAmount: computed( () => calculateTotalAmount(products())),
        totalProducts: computed( () => calculateTotalProducts(products()) )
    })),
    withMethods( ({products,...store}, toastSvc = inject(ToastrService) ) => ({
        addToCart(product:Product){
            const isProductInCart = products().find( (prod:Product) => prod.id === product.id );
            if(isProductInCart){
                isProductInCart.qty++;
                isProductInCart.subTotal = isProductInCart.price * isProductInCart.qty;
                patchState(store,{products: [...products()] })
            } else {
                patchState(store,{products: [...products(),product] });
            }
            toastSvc.success('Product Added','DOMINI STORE');
        },
        removeFromCart(id:number){
           const updateProducts = products().filter( (product) => product.id !== id );
           patchState(store,{products: updateProducts});
           toastSvc.info('Product removed','DOMINI STORE');
        },
        clearCart(){
            patchState(store,initialState);
            toastSvc.info('Cart cleared','DOMINI STORE');
        }
    }))
)

function calculateTotalAmount(products:Product[]):number{
    return products.reduce( (acc,product) => acc + product.price * product.qty, 0 );
}

function calculateTotalProducts(products:Product[]):number{
   return products.reduce( (acc,product) => acc + product.qty, 0 )
}