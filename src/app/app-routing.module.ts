import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { InfoComponent } from './components/info/info.component';

import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  {path: '', redirectTo: 'info', pathMatch: 'full'},
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'quiz/result',
    component: ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
