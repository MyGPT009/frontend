import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { APP_ROUTES } from './constants/routes';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { SettingComponent } from './pages/setting/setting.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: APP_ROUTES.AUTH.REGISTER, component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: APP_ROUTES.AUTH.LOGIN, component: LoginComponent, canActivate: [NoAuthGuard] },

  { path: APP_ROUTES.HOME, component: HomeComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.CONVERSATION.ID, component: ConversationComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.SETTING, component: SettingComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.PROFILE, component: ProfileComponent, canActivate: [AuthGuard] },

  { path: APP_ROUTES.NOT_FOUND, component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
