import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../services/student.service";
import {Student} from "../models/student";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message: string ="";
  students: Student [] = [];
  private student: Student;
  constructor(private router: Router, private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.findAllStudents();
    this.countAlternant();
  }
  findAllStudents(){
    this.studentService.findAll().subscribe(data => {
       this.students = data;
      this.countAlternant();
    });
  }
  findStudentById(id:number){
    this.studentService.findById(id).subscribe(data => {
      this.student = data;
    })
  }

  private countAlternant() {
    let numAlternant = 0;
    this.students.forEach(student => {
      if (student.alternant)
      numAlternant++;
    })
    this.message = "Nombre d'étudiants en alternant: "+numAlternant;
    return this.message;
  }

  onChange(id:number){
    for (let i=0; i < this.students.length; i++){
      console.log(id, i)
      if (id == this.students[i].id){
        this.students[i].alternant = !this.students[i].alternant;
        this.onUpdateStudent(this.students[i]);
        break;
      }

    }
    this.countAlternant();
  }

  onUpdateStudent(student:Student){
    this.studentService.update(student).subscribe(data => {
      console.log(data);
    })
  }
  etudentDetails(id:number){
    this.router.navigateByUrl('/student/'+id)
  }

}
