import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppStarterService } from './app-starter.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AppStarterService,
        {
            provide: APP_INITIALIZER,
            useFactory: (appStarterService) => {
                return () => new Promise<void>((resolve) => {
                    appStarterService.start().subscribe(() => resolve());
                });
            },
            deps: [AppStarterService],
            multi: true
        },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
