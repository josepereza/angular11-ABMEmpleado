import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import * as moment from 'moment';


@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css']
})
export class AddEditEmpleadoComponent implements OnInit {
 myForm:FormGroup;
  cols : number;
  fechaIngreso:moment.Moment;
  estadosCiviles:any[]=['Soltero','Casado','Divorciado']
  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  constructor(private fb:FormBuilder,  private breakpointObserver: BreakpointObserver,private empleadoService:EmpleadoService) {
this.myForm=this.fb.group({
  nombreCompleto:[''],
  telefono:[''],
  correo:[''],
  fechaIngreso:[''],
  sexo:[''],
  estadoCivil:['']
})

    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }

  ngOnInit(): void {
  }
guardar(){
  const empleado: Empleado = {
    nombreCompleto: this.myForm.get('nombreCompleto').value,
    correo: this.myForm.get('correo').value,
    fechaIngreso: this.myForm.get('fechaIngreso').value.toLocaleString(),
    telefono: this.myForm.get('telefono').value,
    estadoCivil: this.myForm.get('estadoCivil').value,
    sexo: this.myForm.get('sexo').value,
  };

  console.log(this.myForm.value)
  console.log('ese es la fecha ',this.myForm.get('fechaIngreso').value.toLocaleString())
  this.empleadoService.saveEmpleado(empleado)
}
}
