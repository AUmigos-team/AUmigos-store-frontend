import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressDialogComponent} from '../address-dialog/address-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-address-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-address-box.component.html',
  styleUrls: ['./delivery-address-box.component.scss']
})
export class DeliveryAddressBoxComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  public enderecoTexto = 'Nenhum endereço cadastrado';

  public endereco?: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
  };

  ngOnInit(): void {
    const enderecoString = localStorage.getItem('enderecoSalvo');
    if (enderecoString) {
      const enderecoSalvo = JSON.parse(enderecoString);
      this.endereco = enderecoSalvo;
      this.enderecoTexto = `${enderecoSalvo.rua}, ${enderecoSalvo.numero} - ${enderecoSalvo.bairro}, ${enderecoSalvo.cidade} - ${enderecoSalvo.estado}`;
    }
  }

  openAddressDialog() {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '700px',
      panelClass: 'custom-dialog',
      data: this.endereco || null
    });

    dialogRef.afterClosed().subscribe((enderecoResult) => {
      if (enderecoResult) {
        this.endereco = enderecoResult;

        this.enderecoTexto = `${enderecoResult.rua}, ${enderecoResult.numero} - ${enderecoResult.bairro}, ${enderecoResult.cidade} - ${enderecoResult.estado}`;

        localStorage.setItem('enderecoSalvo', JSON.stringify(enderecoResult));
      }
    });

  }

}
