import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroductionSliderComponent } from './introduction-slider/introduction-slider.component';
import { UserIntroGuard } from './auth/userIntroGuard/user-intro.guard';

const routes: Routes = [
  // path '' is default entry to the app IF user was logined(signed up) before
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [UserIntroGuard] },

  // if its new user, show them introduction slider
  { path: 'introduction', component: IntroductionSliderComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
