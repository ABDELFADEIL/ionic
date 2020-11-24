import {Component, OnInit} from '@angular/core';
import {MealdbApiService} from "../services/mealdb-api.service";
import {MEALDB_Category, MEALDB_ListItem} from "../models/model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public meals: MEALDB_ListItem [] | null = null;
  public categories: MEALDB_Category [];
  categoryName: string;
  category: any;
  constructor(private mealdbService: MealdbApiService) {}

  getMealsByCategory(category){
    this.category = category;
    this.mealdbService.getMealByCategory(category).subscribe((meals: MEALDB_ListItem[]) => {
      this.meals = meals;
      console.log(this.meals);
    })
  }

  getMealCategories(){
    this.mealdbService.getMealCategories().subscribe( (categories : MEALDB_Category[]) => {
      this.categories = categories;
      console.log( this.categories)
    })
  }
  ngOnInit(): void {
    this.getMealCategories();
    this.getMealsByCategory("Chicken");
  }

  onChange(event) {
    const category = event.detail.value;
    this.getMealsByCategory(category);
  }
}
