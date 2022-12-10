import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from "src/environments/environment";
import { ClienteService } from "../servicos/clientes.service";
import { IFuncionario } from "./IFuncionario";


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  
})
export class FuncionariosComponent implements OnInit {

  public dados!: IFuncionario[];

  constructor(
    private clienteService: ClienteService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.clienteService.obterFuncionarios()
      .subscribe((response: any) => {

        this.dados = response;

        this.chRef.detectChanges();

        const table: any = $('table');

        table.DataTable(environment.tableOptions);
      },
        error => this.toastr.error(error)
      );
  }

  excluirFuncionario(id: any) {
    Swal.fire({
      title: '<strong">Confirmação</strong>',
      text: 'Deseja realmente excluir o Funcionario?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#343a40'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.excluirFuncionario(id).subscribe((response: any) => {

            this.dados.forEach((value, index): void => {
              if (value.id == id) {
                this.dados.splice(index, 1);
              }
            });

            this.toastr.success("Funcionario excluido com sucesso!");
        },
        error => this.toastr.error(error));
      }
    });
  }
}