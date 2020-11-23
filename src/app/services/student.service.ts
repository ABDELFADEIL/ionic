import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../models/student";



@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private host: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }
  
  
  findAll(){
    return this.http.get<Student[]>(this.host+"students");
  }

  findById(id:number){
    return this.http.get<Student>(this.host+"students/"+id);
  }

    update(student: Student) {
      return this.http.patch<Student>(this.host+"students/"+student.id, student);
    }
}

/*

fetch('http://localhost:3000/students', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      }).then(data => {
       console.log(data)
      });
 */