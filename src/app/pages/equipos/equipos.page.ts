import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
})
export class EquiposPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
