import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepChooseComponent } from './step-choose/step-choose.component';
import { StepOpponentTurnComponent } from './step-opponent-turn/step-opponent-turn.component';
import { ScoreboardComponent } from './header/scoreboard/scoreboard.component';
import { RulesComponent } from './rules/rules.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    StepChooseComponent,
    StepOpponentTurnComponent,
    ScoreboardComponent,
    RulesComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
