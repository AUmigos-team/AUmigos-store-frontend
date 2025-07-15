import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-advantage-modal',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './advantage-modal.component.html',
  styleUrl: './advantage-modal.component.scss'
})
export class AdvantageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
