import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cliente } from "../clientes/cliente";
import { environment } from "src/environments/environment";
import { IFuncionario } from "../funcionarios/IFuncionario";

@Injectable()
export class ClienteService {

constructor(private http: HttpClient){}

    private urlApi = environment.urlApi;
    private v1 = "v1/";

    obterClientes() : Observable<Cliente[]>{
        return this.http
            .get<Cliente[]>(this.urlApi + "Departamento");
    }   

    obterFuncionarios() : Observable<IFuncionario[]>{
        return this.http
            .get<IFuncionario[]>(this.urlApi + "Funcionario");
    }

    obterFuncionariosPorDepartamento(id: number) : Observable<IFuncionario[]>{
        return this.http
            .get<IFuncionario[]>(this.urlApi + "Departamento/" + id);
    }

    obterCliente(id: number) : Observable<Cliente[]>{
        return this.http
            .get<Cliente[]>(this.urlApi + "Departamento"+ id);
    }

    obterFuncionario(id: number) : Observable<IFuncionario[]>{
        return this.http
            .get<IFuncionario[]>(this.urlApi + "Funcionario"+ id);
    }

    obterProfisoes() : Observable<Cliente[]>{
        return this.http
            .get<Cliente[]>(this.urlApi + this.v1 + "profissao");
    }

    cadastrarCliente(cliente: any) : Observable<Cliente[]>{
        return this.http
        .post<Cliente[]>(this.urlApi + "Departamento", cliente).pipe((response: any) => response);
    }

    cadastrarFuncionario(funcionario: any) : Observable<IFuncionario[]>{
        return this.http
        .post<IFuncionario[]>(this.urlApi + "Funcionario", funcionario).pipe((response: any) => response);
    }

    editarCliente(cliente: any) : Observable<Cliente[]>{
        return this.http
        .put<Cliente[]>(this.urlApi + "Departamento/" + cliente.id , cliente ).pipe((response: any) => response);
    }

    editarFuncionario(funcionario: any) : Observable<IFuncionario[]>{
        return this.http
        .put<IFuncionario[]>(this.urlApi + "Funcionario/" + funcionario.id , funcionario ).pipe((response: any) => response);
    }

    excluirCliente(id: number) {
        return this.http
        .delete(this.urlApi + "Departamento/" + id).pipe((response: any) => response);
    }

    excluirFuncionario(id: number) {
        return this.http
        .delete(this.urlApi + "Funcionario/" + id).pipe((response: any) => response);
    }
}