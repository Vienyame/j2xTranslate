import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: '../../modules/home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: '../../modules/about/about.module#AboutModule'
  },
  {
    path: 'editor',
    loadChildren: '../../modules/editor-board/editor-board.module#EditorBoardModule'
  }

  // { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
