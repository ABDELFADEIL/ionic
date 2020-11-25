import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../models/question";
import {map} from "rxjs/operators";

const API = {
  ROOT: "http://localhost:3000/questions"
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions() :Observable<Question[]>{
    return this.http.
    get(API.ROOT )
        .pipe(  map( (res: any)=> res))
  }
}
