import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MEALDB_Category, MEALDB_ListItem, MEALDB_Meal} from "../models/model";


const MEALDB_API = {
  ROOT: "https://www.themealdb.com/api/json/v1/1/",
  get FILTER(){ // list repats par category
    return this.ROOT + "filter.php?c="
  },
  get LOOKUP(){ // obtenir les infos détailées d'un repats (par identifiant)
    return this.ROOT + "lookup.php?i="
  },
  get CATEGORIES() {
    return this.ROOT + "categories.php"
  }
}

@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {


  constructor(private http: HttpClient) { }

  getMealByCategory(category:string) :Observable<MEALDB_ListItem[]>{
    return this.http.
    get<MEALDB_ListItem[]>(MEALDB_API.FILTER + category).
        pipe(
            map( (res: any)=> res.meals)
            );
  }

  getMealDetailById(id: string) :Observable<MEALDB_Meal>{
    return this.http
        .get(MEALDB_API.LOOKUP + id)
        .pipe(
            map( (res: any) => res.meals[0])
        );
  }

  getMealCategories() :Observable<MEALDB_Category []>{
    return this.http.get<MEALDB_Category[]>(MEALDB_API.CATEGORIES)
        .pipe(
          map((res: any)=> res.categories)
        );
  }

}
