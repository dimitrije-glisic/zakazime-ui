import {Service} from "../openapi";

export interface Business {
    name: string;
    phone: string;
    city: string;
    postalCode: string;
    address: string;
    status: string;
    ownerEmail: string;
    type: string;
    services: Service[];
}
