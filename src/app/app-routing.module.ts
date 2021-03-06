import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ContactComponent } from './components/contact/contact.component';
import { DevComponent } from './components/dev/dev.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m=> m.ProductModule) ,
      },
      {
        path:'order',
        loadChildren: ()=> import('./order/order.module').then(m=>m.OrderModule)
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'dev',
        component: DevComponent,
      },
      
    ],
  },
  
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)

  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
