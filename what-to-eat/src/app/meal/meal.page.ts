import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MealdbApiService} from "../services/mealdb-api.service";
import {Observable, pipe} from "rxjs";
import {tap} from "rxjs/operators";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MEALDB_Ingredient, MEALDB_Meal} from "../models/model";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal$: Observable<MEALDB_Meal>;
  mealId: string;
  ingredients: MEALDB_Ingredient [];
    ingredientsInfo: MEALDB_Ingredient [];

    constructor(private activatedRoute: ActivatedRoute,
              private mealService: MealdbApiService,
              private sanitizer: DomSanitizer,
              ) { }

  ngOnInit() {
    this.mealId = this.activatedRoute.snapshot.paramMap.get("id");
    this.meal$ =this.mealService.getMealDetailById(this.mealId)
        .pipe(
        tap((meal: MEALDB_Meal) => {
          console.log("meal")
          console.log(meal)
            this.ingredientsInfo = this.getIngredientsOfMeal(meal);
        })
        );

  }

  getMealDetailById(id: string){
   return this.mealService.getMealDetailById(id);
  }

  private getIngredientsOfMeal(meal: MEALDB_Meal){
      let ingredients: MEALDB_Ingredient [] = [];
    for (let i = 1; i <= 20; i++){
      let strIngredient: string = meal["strIngredient"+i];
        let strMeasure: string = meal["strMeasure"+i];
        if (strIngredient != "" && strMeasure != ""){
            console.log(strIngredient, strMeasure);
            let ingredientInfo: MEALDB_Ingredient = new MEALDB_Ingredient();
            ingredientInfo.strIngredient = strIngredient;
            ingredientInfo.strMeasure = strMeasure;
            ingredients.push(ingredientInfo);
      }
    }
     console.log(ingredients)
    return ingredients
  }

  getYouTubeLink(meal: MEALDB_Meal) :SafeResourceUrl{
    //SafeResourceUrl
    let id =meal.strYoutube.split("=")[1];
   return this.sanitizer.bypassSecurityTrustResourceUrl(
       "https://www.youtube.com/embed/"+id
   );
  }
}
