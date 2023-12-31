export const REGISTRATION_TYPE_BUSINESS = 'BUSINESS';
export const REGISTRATION_TYPE_CUSTOMER = 'CUSTOMER';

export interface RegistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}