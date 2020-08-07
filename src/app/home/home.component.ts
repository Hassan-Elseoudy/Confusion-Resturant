import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseurl';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseURL = baseURL;
  dishErrMess: string;

  constructor(private dishService: DishService, private promotionService: PromotionService, private leaderService: LeaderService) { }

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, err => this.dishErrMess = (err as any));
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.leader = leader);
  }

}
