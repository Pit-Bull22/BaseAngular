import { Routes } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { ContatoComponent } from './institucional/contato/contato.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteEditarComponent } from './clientes/cliente-editar/cliente-editar.component';
import { ClienteCriarComponent } from './clientes/cliente-criar/cliente-criar.component';
import { Component } from '@angular/core';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { FuncionarioCriarComponent } from './funcionarios/funcionario-criar/funcionario-criar.component';
import { FuncionarioEditarComponent } from './funcionarios/funcionario-editar/funcionario-editar.component';
import { FuncionarioDepartamentoComponent } from './funcionarios/funcionario-departamento/funcionario-departamento.component';





export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'contato', component: ContatoComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'funcionarios', component: FuncionariosComponent},
    { path: 'funcionario-editar', component: FuncionarioEditarComponent},
    { path: 'funcionario-criar', component: FuncionarioCriarComponent},
    { path: 'funcionario-departamento', component: FuncionarioDepartamentoComponent},
    { path: 'cliente-criar', component: ClienteCriarComponent },
    { path: 'cliente-editar', component: ClienteEditarComponent },

];