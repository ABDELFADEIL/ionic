import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {StudentService} from "../services/student.service";
import {Student} from "../models/student";

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public student: Student;
  id
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private studentService: StudentService) { }

 
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( params => {
        this.id = params.get('id');
    });
    this.findStudentById(this.id);
  }

  findStudentById(id:number){
    this.studentService.findById(id).subscribe(data => {
      this.student = data;
    });
  }
}
