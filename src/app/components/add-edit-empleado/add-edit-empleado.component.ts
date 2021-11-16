import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css']
})
export class AddEditEmpleadoComponent implements OnInit {
  myForm: FormGroup;
  cols: number;
  fechaIngreso: moment.Moment;
  estadosCiviles: any[] = ['Soltero', 'Casado', 'Divorciado']
  idEmpleado!: number;
  accion:string = 'Crear';
  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private empleadoService: EmpleadoService) {

    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.email]],
      fechaIngreso: [''],
      sexo: [''],
      estadoCivil: ['']
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

    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idEmpleado != undefined){
      this.accion = "Editar";
      this.buscarEmpleado();
  }
  }
  guardar() {
    const empleado: Empleado = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      correo: this.myForm.get('correo').value,
      fechaIngreso: this.myForm.get('fechaIngreso').value,
      telefono: this.myForm.get('telefono').value,
      estadoCivil: this.myForm.get('estadoCivil').value,
      sexo: this.myForm.get('sexo').value,
    };

    if(this.idEmpleado !== undefined){
      this.editarEmpleado(empleado);
    }else{
      this.agregarEmpleado(empleado);
    }
  }

  agregarEmpleado(empleado:Empleado):void{
    this.empleadoService.saveEmpleado(empleado);

      this.snackBar.open('El empleado fue agregado con exito','',{
        duration: 3000
      });

      this.router.navigate(['/']);
  }
  buscarEmpleado(){
    const empleado: Empleado = this.empleadoService.buscarEmpleado(this.idEmpleado);
    this.myForm.patchValue({
      nombreCompleto: empleado.nombreCompleto,
      correo: empleado.correo,
      telefono: empleado.telefono,
      fechaIngreso: empleado.fechaIngreso,
      estadoCivil: empleado.estadoCivil,
      sexo: empleado.sexo
    });
  }
  editarEmpleado(empleado:Empleado):void{
    this.empleadoService.editarEmpleado(empleado,this.idEmpleado);

    this.snackBar.open('El empleado fue actualizado con exito','',{
      duration: 3000
    });

    this.router.navigate(['/']);
}
}
