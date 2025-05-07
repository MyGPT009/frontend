import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { APP_ROUTES } from './constants/routes';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: APP_ROUTES.AUTH.REGISTER, component: RegisterComponent },
  { path: APP_ROUTES.AUTH.LOGIN, component: LoginComponent },

  { path: APP_ROUTES.HOME, component: HomeComponent },
  { path: APP_ROUTES.SETTING, component: SettingComponent },
  { path: APP_ROUTES.PROFILE, component: ProfileComponent },

  { path: APP_ROUTES.NOT_FOUND, component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
