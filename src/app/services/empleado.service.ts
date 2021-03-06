import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
listEmpleado:Empleado[]=[
  {nombreCompleto:"Jose Perez", telefono:242424, correo:"jose@gmail.com", fechaIngreso:new Date,sexo:"Masculino",estadoCivil:"Soltero"},
  {nombreCompleto:"Santi  Perez", telefono:242424, correo:"santi@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"},
  {nombreCompleto:"Santi2  Perez", telefono:242424, correo:"santi@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"},
  {nombreCompleto:"Santi3  Perez", telefono:242424, correo:"santi@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"}
,  {nombreCompleto:"Santi4  Perez", telefono:242424, correo:"santi@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"}
,  {nombreCompleto:"Santi5 Perez", telefono:242424, correo:"santi@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"}
,  {nombreCompleto:"Santi6 Perez", telefono:242424, correo:"aanti@gmail.com", fechaIngreso:new Date,sexo:"Masculino", estadoCivil:"Casado"}



]
  constructor() { }
  getEmpleados(){
    return this.listEmpleado.slice();
  }
  delEmpleado(index){
    console.log('index ',index)
    this.listEmpleado.splice(index,1)
  }
  saveEmpleado(empleado){
    console.log(empleado)
    this.listEmpleado.push(empleado)
    console.log(this.listEmpleado)
  }
  buscarEmpleado(index:number):Empleado{
    return this.listEmpleado[index];
  }
  editarEmpleado(empleado:Empleado, index:number):void{
    this.listEmpleado[index].nombreCompleto = empleado.nombreCompleto;
    this.listEmpleado[index].correo = empleado.correo;
    this.listEmpleado[index].telefono = empleado.telefono;
    this.listEmpleado[index].sexo = empleado.sexo;
    this.listEmpleado[index].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[index].estadoCivil = empleado.estadoCivil;
}

}
