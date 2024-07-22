import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./products.component')
    },
    {
        path: 'detail/:id',
        loadComponent: () => import('./details/details.component')
    }
]

export default routes;