import {Component, OnInit} from '@angular/core';
import {AppointmentRichObject} from "../../interfaces/appointment-rich-object";
import {Review} from "../../interfaces/review";
import {AppointmentService} from "../booking/services/appointment.service";
import {BusinessService} from "../../business/services/business-service";
import {Business} from "../../interfaces/business";


interface ReviewData {
  review: Review;
  appointmentData: AppointmentRichObject;
}

@Component({
  selector: 'app-business-reviews-list',
  templateUrl: './business-reviews-list.component.html',
  styleUrl: './business-reviews-list.component.css'
})
export class BusinessReviewsListComponent implements OnInit {

  reviews: ReviewData[] | undefined;
  business: Business | undefined;

  constructor(private appointmentService: AppointmentService, private businessService: BusinessService) {
  }

  ngOnInit(): void {
    this.businessService.getBusinessCached().subscribe(business => {
      this.business = business;
      if (!business) {
        throw new Error('BusinessReviewsListComponent: Business is not loaded');
      }
      this.loadReviews(business.id);
    })
  }

  private loadReviews(businessId: number) {
    this.appointmentService.getAllAppointmentsWithReviewsForBusiness(businessId).subscribe(appointments => {
      this.reviews = appointments
        .filter(appointment => appointment.review)
        .map(
          appointment => ({
            review: appointment.review!,
            appointmentData: appointment
          })
        )
    });
  }

  avgRating(review: Review) {
    return (review.service + review.priceQuality + review.hygiene + review.ambience) / 4;
  }

  categories = [
    {name: 'Usluga'},
    {name: 'Cena/Kvalitet'},
    {name: 'Higijena'},
    {name: 'Ambijent'}
  ];

  getRating(categoryName: string): number {
    // Check if reviews exist and have a length greater than 0 to avoid division by zero
    if (!this.reviews || this.reviews.length === 0) {
      return 0; // Return a default value or handle this scenario as needed
    }

    return this.reviews.map(review => {
      switch (categoryName) {
        case 'Usluga':
          return review.review.service;
        case 'Cena/Kvalitet':
          return review.review.priceQuality;
        case 'Higijena':
          return review.review.hygiene;
        case 'Ambijent':
          return review.review.ambience;
        default:
          return 0; // Return a default value for unknown categories
      }
    }).reduce((acc, curr) => acc + curr, 0) / this.reviews.length;
  }


  getTotalAverage(): number {
    if (!this.reviews || this.reviews.length === 0) {
      return 0;
    }
    return this.reviews.map(review => this.avgRating(review.review)).reduce((acc, curr) => acc + curr, 0) / this.reviews.length;
  }

  getTotalReviews(): number {
    return this.reviews ? this.reviews.length : 0;
  }

}

