import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankTemplateComponent} from './components/template/blank-template.component';
import {LeftNavTemplateComponent} from './components/template/left-nav-template.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { SuperviseurGuard } from './guards/superviseur.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { BlankTmpComponent } from './components/template-frontOffice/blank-tmp/blank-tmp.component';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { ListparksComponent } from './components/listparks/listparks.component';
export const routes: Routes = [{
  path: '',
  redirectTo: 'welcome',
  pathMatch: 'full'
},
{
  path: 'admins',
  redirectTo: 'dashboard',
  pathMatch: 'full'
},
{path: 'welcome',
loadChildren: () => import('./components/welcome/welcome/welcome.module').then(m => m.WelcomeModule),
data: {
  title: 'IParking'
},
},

{
  path: 'loginadmin',
  loadChildren: () => import('./components/login-admin/login-admin-routing/login-admin.module').then(m => m.LoginAdminModule),
  data: {
    title: 'IParking'
  },

},
{
  path: 'loginuser',
  loadChildren: () => import('./components/login-user/login-user/login-user.module').then(m => m.LoginUserModule),
  data: {
    title: 'IParking'
  },
},

{path: 'registerUser',
loadChildren: () => import('./components/register-user/register-user/register-user.module').then(m => m.RegisterUserModule),
data: {
  title: 'IParking'
},
},
{path: 'registerAdmin',
loadChildren: () => import('./components/register-admin/register-admin/register-admin.module').then(m => m.RegisterAdminModule),
data: {
  title: 'IParking'
},
},
{path: 'forgot',
loadChildren: () => import('./components/forgot-password/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
data: {
  title: 'IParking'
},
},

{
  path: 'home',
  loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  data: {
    title: 'IParking'
  },
  canActivate: [UserGuard, AuthGuard],

},
{
  path: 'map',
  loadChildren: () => import('./components/map/map.module').then(m => m.MapModule),
  data: {
    title: 'IParking'
  },
  canActivate: [UserGuard]
},
{
  path: 'inscri',
  loadChildren: () => import('./components/inscription/inscription/inscription.module').then(m => m.InscriptionModule),
  data: {
    title: 'IParking'
  },
  canActivate: [UserGuard]
},
{
  path: 'contact',
  loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
  data: {
    title: 'IParking'
  },
  canActivate: [UserGuard]

},
{
  path: 'consult',
  loadChildren: () => import('./components/listReservations/listReservations.module').then(m => m.ListReservationsModule),
  data: {
    title: 'IParking'
  },
  canActivate: [AuthGuard,UserGuard]
},


{
  path: 'payment',
  loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule),
  data: {
    title: 'IParking'
  },
  canActivate: [AuthGuard,UserGuard]
},


{
  path: 'cardPay',
  loadChildren: () => import('./components/cardPayment/cardPayment.module').then(m => m.CardPaymentModule),
  data: {
    title: 'IParking'
  },


},
{
  path: 'accueil',
  loadChildren: () => import('./components/accueil/accueil/accueil.module').then(m => m.AccueilModule),
  data: {
    title: 'IParking'
  },
  canActivate: [AuthGuard,UserGuard]
  },
   {
  path: '',
  component: LeftNavTemplateComponent,
  data: {
    title: 'IParking'
  },

  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuard ]
    },
    {
      path: 'reservations',
      loadChildren: () => import('./components/reservations/reservations.module').then(m => m. ReservationsModule),
      canActivate: [SuperviseurGuard]
    },
    {
      path: 'add-admin',
      loadChildren: () => import('./components/admins/admins.module').then(m => m.AdminsModule),
      canActivate: [SuperAdminGuard ]
    },
    {
      path: 'places',
      loadChildren: () => import('./components/places/places.module').then(m => m.PlacesModule),
      canActivate: [AdminGuard ]
    },
    {
      path: 'capteurs',
      loadChildren: () => import('./components/capteurs/capteurs.module').then(m => m.CapteursModule),
      canActivate: [AdminGuard ]
    },
    {
      path: 'parks',
      loadChildren: () => import('./components/listparks/listparks.module').then(m => m.ListparksModule),
      canActivate: [AdminGuard ]
    },
    {
      path: 'listparks',
      loadChildren: () => import('./components/listparks/listparks.module').then(m => m.ListparksModule),
      canActivate: [AdminGuard ]
    },
    {
      path: 'license',
      loadChildren: () => import('./components/license/license.module').then(m => m.LicenseModule),
      canActivate: [SuperAdminGuard ]
    },
    {
      path: 'paypal',
      loadChildren: () => import('./components/paypal/paypal.module').then(m => m.PaypalModule),
      data: {
        title: 'IParking'
      },
    },

  ]
},  {
  path: '**',
  component: PageNotFoundComponent
}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
