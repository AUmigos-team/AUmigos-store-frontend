import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvantagesComponent } from './components/advantages/advantages.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AdvantagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
