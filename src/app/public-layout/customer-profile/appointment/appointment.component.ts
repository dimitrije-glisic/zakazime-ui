import {Component} from '@angular/core';
import {AuthService} from "../../../auth.service";
import {AppointmentService} from "../../booking/services/appointment.service";
import {Account} from "../../../interfaces/account";
import {AppointmentRichObject} from "../../../interfaces/appointment-rich-object";
import {Appointment} from "../../../interfaces/appointment";
import {MatDialog} from "@angular/material/dialog";
import {ReviewDialogComponent} from "../review-dialog/review-dialog.component";
import {Review} from "../../../interfaces/review";
import {ReviewRequest} from "../../../interfaces/review-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  user: Account | undefined;
  allAppointments: AppointmentRichObject[] = [];
  previousAppointments: AppointmentRichObject[] = [];
  upcomingAppointments: AppointmentRichObject[] = [];
  appointmentsToDisplay: AppointmentRichObject[] = [];
  selectedTab: string = 'upcoming';

  constructor(private authService: AuthService, private appointmentService: AppointmentService,
              private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      console.log('User is not logged in');
      throw new Error('User is not logged in');
    }
    this.loadAppointments();
  }

  private loadAppointments() {
    this.appointmentService.getAppointmentsForUser(this.user!.id).subscribe(appointments => {
      this.allAppointments = appointments;
      this.previousAppointments = appointments.filter(appointment => new Date(appointment.appointment.endTime) < new Date());
      this.upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointment.startTime) >= new Date());
      this.appointmentsToDisplay = this.selectedTab === 'previous' ? this.previousAppointments : this.upcomingAppointments;
    });
  }

  onStatusChange(appointment: Appointment, statusEvent: string) {
    console.log('Updating status to', statusEvent);
    const businessId = appointment.businessId;
    const employeeId = appointment.employeeId;
    const appointmentId = appointment.id;
    this.appointmentService.updateStatus(businessId, employeeId, appointmentId, statusEvent.toLowerCase()).subscribe(() => {
      appointment.status = statusEvent;
      this.loadAppointments();
    });
  }

  selectTab(appointmentTimeRelevanceTab: string) {
    this.selectedTab = appointmentTimeRelevanceTab;
    this.appointmentsToDisplay = appointmentTimeRelevanceTab === 'previous' ? this.previousAppointments : this.upcomingAppointments;
  }

  openReviewDialog(appointmentData: AppointmentRichObject) {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Review) => {
      console.log('The dialog was closed. Result:', result);
      if (result) {
        const request: ReviewRequest = {
          appointmentId: appointmentData.appointment.id,
          service: result.service,
          priceQuality: result.priceQuality,
          hygiene: result.hygiene,
          ambience: result.ambience,
          comment: result.comment
        };
        this.appointmentService.addReview(request).subscribe(() => {
          this.loadAppointments();
        });
      }
    });
  }

  averageRating(review: Review) {
    return (review.service + review.priceQuality + review.hygiene + review.ambience) / 4;
  }
}
