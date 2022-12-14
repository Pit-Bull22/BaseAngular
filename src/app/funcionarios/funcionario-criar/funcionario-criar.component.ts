import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../servicos/clientes.service';
import { IFuncionario } from '../IFuncionario';


@Component({
  selector: 'app-funcionario-criar',
  templateUrl: './funcionario-criar.component.html'
})
export class FuncionarioCriarComponent implements OnInit {
  
  cadFuncionarios!: IFuncionario[];
  formCliente: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { 
      this.formCliente =  this.formBuilder.group({
        id: ['', null],
        nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
        foto: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])],
        rg: ['', null],
        departamentoId: ['',null],  
      });
     }   

  ngOnInit(): void {
      this.clienteService.obterFuncionarios().subscribe((response: any) => {
      this.cadFuncionarios = response.result;

    });
  }

  onSubmitForm(form: any) { 
    if(this.formCliente.valid){      
      Swal.fire({
        title: '<strong">Confirmação</strong>',
        text: 'Deseja realmente cadastrar o Funcionario?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#343a40'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clienteService.cadastrarFuncionario(this.formCliente.value).subscribe((response: any) => {
              this.toastr.success("Funcionario cadastrado com sucesso!");
              this.Router.navigateByUrl("/clientes");
          },
          error => this.toastr.error(error));
        }
       });
    }  
    else{
      Object.keys(this.formCliente.controls).forEach(campo => {
        const controle = this.formCliente.get(campo);
        controle?.markAsDirty();
      });
    }   
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
