import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RulesComponent } from './rules/rules.component';
import { AboutComponent } from './about/about.component';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  {path: 'game', component: GameComponent },
  {path: 'rules', component: RulesComponent },
  {path: 'about', component: AboutComponent },
  {path: 'board', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
