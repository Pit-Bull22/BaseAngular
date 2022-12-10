import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../servicos/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styles: [
  ]
})
export class ClienteEditarComponent implements OnInit {

  idRoute: any;
  listaProfisoes: any[] = []; 
  formCliente!: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) {
      this.carregarForm(new Cliente); 
    }   

  carregarForm(model: any){
    this.formCliente =  this.formBuilder.group({
      id: [model.id],
      nome: [model.nome, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      sigla: [model.sigla, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])],
    })
  }

  ngOnInit(): void {
    this.idRoute = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.clienteService.obterCliente(this.idRoute).subscribe((response: any) => {
      response.result.dtNasc = response.result.dtNasc.slice(0, 10); 

      this.carregarForm(response.result); 
    });
  }

  onSubmitForm(form: any): void {
    Swal.fire({
      title: '<strong>Confirmação</strong>',
      text: 'Deseja realmente editar o departamento?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#343a40'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.editarCliente(this.formCliente.value).subscribe((response: any) => {
            this.toastr.success("Departamento editado com sucesso!");
            this.Router.navigateByUrl("/clientes");
        },
        error => this.toastr.error(error));
      }
    });
  }

  aplicaCssErro(campo: any){
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.verificaValidTouched(campo),
    }
  }

  verificaValidTouched(campo: any){
    return !this.formCliente.get(campo)?.valid && (!!this.formCliente.get(campo)?.touched || !!this.formCliente.get(campo)?.dirty);
  }

}
