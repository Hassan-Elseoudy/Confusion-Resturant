import { Component, OnInit } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dishService: DishService , private promotionService: PromotionService) { }

  dish: Dish;
  promotion: Promotion;

  ngOnInit(): void {
    this.dish = this.dishService.getDishFatured();
    this.promotion = this.promotionService.getPromotionFatured();
  }

}
