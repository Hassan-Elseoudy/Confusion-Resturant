import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promotion[] {
    return PROMOTIONS;
  }

  getPromotion(id: string) {

    return PROMOTIONS.filter((promotion) => (promotion.id === id))[0];
  }

  getPromotionFatured() {
    return PROMOTIONS.filter((promotion) => (promotion.featured))[0];
  }
}
