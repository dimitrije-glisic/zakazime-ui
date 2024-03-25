import {Component, OnInit} from '@angular/core';
import {Business} from "../../../../interfaces/business";
import {AdminService} from "../../../services/admin.service";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-businesses-waiting-for-approval',
  templateUrl: './businesses-waiting-for-approval.component.html',
  styleUrls: ['./businesses-waiting-for-approval.component.css']
})
export class BusinessesWaitingForApprovalComponent implements OnInit {

  businesses: Business[] | undefined;
  currentBusinessIndex = 0;

  constructor(private adminService: AdminService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.adminService.getAllBusinessesWaitingForApproval().subscribe(businesses => {
      this.businesses = businesses;
    });
  }

  nextBusiness() {
    if (this.currentBusinessIndex < this.businesses!.length - 1) {
      this.currentBusinessIndex++;
    }
  }

  previousBusiness() {
    if (this.currentBusinessIndex > 0) {
      this.currentBusinessIndex--;
    }
  }

  approveBusiness(business: Business) {
    this.confirmAction('approve', business);
  }


  rejectBusiness(business: Business) {
    this.confirmAction('reject', business);
  }

  confirmAction(action: 'approve' | 'reject', business: Business) {
    let message = action === 'approve' ? 'Da li ste sigurni da želite da odobrite ovaj zahtev?' : 'Da li ste sigurni da želite da odbijete ovaj zahtev?';

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {action: action, message: message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirmed) {
        if (action === 'approve') {
          console.log('Approval confirmed for:', business);
          this.adminService.approveBusiness(business.id).subscribe(() => {
            this.businesses = this.businesses?.filter(b => b.id !== business.id);
          });
        } else if (action === 'reject') {
          const rejectReason = result.rejectReason;
          console.log('Rejection confirmed for:', business.id);
          this.adminService.rejectBusiness(business.id, rejectReason).subscribe(() => {
            this.businesses = this.businesses?.filter(b => b.id !== business.id);
          });
        }
      } else {
        console.log(action.charAt(0).toUpperCase() + action.slice(1) + ' cancelled or dismissed for:', business.id);
      }
    });
  }


}
