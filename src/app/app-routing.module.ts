import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepChooseComponent } from './step-choose/step-choose.component';
import { StepOpponentTurnComponent } from './step-opponent-turn/step-opponent-turn.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  { path: '', component: StepChooseComponent },
  { path: 'rules', component: RulesComponent, outlet: 'rules' },
  { path: ':id', component: StepOpponentTurnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
