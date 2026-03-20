import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MainComponent } from './components/main/main.component';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
   standalone: true,
  imports: [ HeaderComponent, FooterComponent, MainComponent,FormComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'miApp';
}
