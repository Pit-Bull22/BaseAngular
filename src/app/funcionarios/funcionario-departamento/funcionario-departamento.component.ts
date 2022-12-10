import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../servicos/clientes.service';
import { IFuncionario } from '../IFuncionario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-funcionario-departamento',
  templateUrl: './funcionario-departamento.component.html',
})
export class FuncionarioDepartamentoComponent implements OnInit {
  
  public dados!: IFuncionario[];
  http: any;
  requests: any;

  constructor(
    private clienteService: ClienteService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.clienteService.obterFuncionariosPorDepartamento(6)
      .subscribe((response: any) => {

        this.dados = response;

        this.chRef.detectChanges();

        const table: any = $('table');

        table.DataTable(environment.tableOptions);
      },
        error => this.toastr.error(error)
      );
  }
}
