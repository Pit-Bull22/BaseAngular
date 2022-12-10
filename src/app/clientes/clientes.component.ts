import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from "src/environments/environment";
import { Cliente } from "./cliente";
import { ClienteService } from "../servicos/clientes.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  public data!: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.clienteService.obterClientes()
      .subscribe((response: any) => {

        this.data = response;

        this.chRef.detectChanges();

        const table: any = $('table');

        table.DataTable(environment.tableOptions);
      },
        error => this.toastr.error(error)
      );
  }

  excluirCliente(id: any) {
    Swal.fire({
      title: '<strong">Confirmação</strong>',
      text: 'Deseja realmente excluir o Departamento?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#343a40'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.excluirCliente(id).subscribe((response: any) => {

            this.data.forEach((value, index) => {
              if (value.id == id) {
                this.data.splice(index, 1);
              }
            });

            this.toastr.success("Departamento excluido com sucesso!");
        },
        error => this.toastr.error(error));
      }
    });
  }

  exibirFuncionarios(id: any){

  }
}