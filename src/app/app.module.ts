import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignupComponent } from './user/signup/signup.component';
import { SharedModule } from './shared/shared.module';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, //Browser Module comes by default in the app module.The app module is a Entry module for the application
    UserModule,
    ChatModule,
    SharedModule,
    SocialLoginModule,
    HttpClientModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,

    RouterModule.forRoot([
      {path:'login',component:LoginComponent,pathMatch:'full'},
    {path:'',redirectTo:'login',pathMatch:'full'}, // So as per this when we give localhost:4200/ then it goes in this path
    //{path:'',component:SignupComponent,pathMatch:'full'}, // So as per this when we give localhost:4200/ then it goes in this path
      {path:'*',component:SignupComponent},
     {path:'**',component:LoginComponent}
    ])
  ],
  providers: [AppService,{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
