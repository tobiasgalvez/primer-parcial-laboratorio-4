import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'primer-parcial';

  constructor(private router: Router)
  {

  }

  IrAOtraRuta(path: string) {
    console.log("hola");
    this.router.navigate([path]);
  }
}
