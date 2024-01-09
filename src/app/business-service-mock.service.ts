import { Injectable } from '@angular/core';
import { Business } from './interfaces/business.interface';
import {Service} from "./openapi";

@Injectable({
  providedIn: 'root'
})
export class BusinessServiceMockService {

  businesses: Business[];

  constructor() {
    this.businesses = generateMockData();
  }

  getBusinesses() {
    return this.businesses;
  }

  getCityImageUrl(city: string) {
    return cityImages[city] || 'assets/images/default-city.jpg';
  }

  getCategoryImageUrl(category: string) {
    return categoryImages[category] || 'assets/images/default-category.jpg';
  }

  getServiceImageUrl(serviceName: string): string {
    return serviceImages[serviceName] || 'assets/images/default-service.jpg';
  }

  getTypeImageUrl(type: string): string {
    return typeImages[type] || 'assets/images/beauty.jpg';
  }

  getSubCategoryImageUrl(subCategory: string): string {
    return subCategoryImages[subCategory] || 'assets/images/default-subcategory.jpg';
  }

}

const typeImages: { [key: string]: string } = {
  // Add your type-image mappings here
  'ULEPSAVANJE': 'assets/images/beauty.jpg',
  'MEDICINA': 'assets/images/health.jpg',
  // ... other types
};

const categoryImages: { [key: string]: string } = {
  // Add your category-image mappings here
  'HAIR': 'assets/images/category/hair',
  // 'Nails': 'assets/images/url-to-nails-category-image',
  // ... other categories
};

const subCategoryImages: { [key: string]: string } = {
  'WOMAN-HAIR': 'assets/images/subcategory/woman-hair',
}

const cityImages: { [key: string]: string } = {
  // 'Belgrade': 'assets/images/url-to-belgrade-image',
  // 'Novi Sad': 'assets/images/url-to-novi-sad-image',
  // 'Nis': 'assets/images/url-to-nis-image',
  // 'Gornji Milanovac': 'assets/images/url-to-gornji-milanovac-image',
  // 'Kragujevac': 'assets/images/url-to-kragujevac-image',
  // 'Uzice': 'assets/images/url-to-uzice-image'
};

const serviceImages: { [key: string]: string } = {
  // Add your service-image mappings here
  // 'Service 1': 'assets/images/url-to-service-1-image',
  // 'Service 2': 'assets/images/url-to-service-2-image',
  // ... other services
};

function generateMockData() {
  const businessTypes = ['ULEPSAVANJE', 'MEDICINA'];

  const businessTypeToServiceCategories: { [key: string]: { [category: string]: string[] } } = {
    'ULEPSAVANJE': {
      'Hair': ['Man Haircuts', 'Woman Haircuts', 'Children Haircuts'],
      'Nails': ['Manicure', 'Pedicure'],
      'Massage': ['Therapeutic Massage', 'Relaxing Massage'],
      'Yoga': ['Hatha Yoga', 'Vinyasa Yoga']
    },
    'MEDICINA': {
      'General Health': ['Check-up', 'Consultation'],
      'Dental': ['Teeth Cleaning', 'Teeth Whitening']
    }
  };

  const cities: { [key: string]: string } = {
    'Belgrade': '11000',
    'Novi Sad': '21000',
    'Nis': '18000'
  };

  function generateServicesFor(businessName:string, mainCategory:string, subCategory:string) {
    const services = [];
    for (let i = 0; i < 3; i++) { // Generating 3 services per subcategory
      services.push({
        id: `service-${subCategory.toLowerCase()}-${i}`,
        name: `${subCategory} Service ${i + 1}`,
        note: `Note for ${subCategory} service ${i + 1}`,
        description: `Description for ${subCategory} service ${i + 1}`,
        price: Math.floor(Math.random() * 1000) + 100,
        avgDuration: Math.floor(Math.random() * 120) + 30, // Duration in minutes
        categoryName: mainCategory,
        subCategoryName: subCategory,
        businessName: businessName
      });
    }
    return services;
  }

  // Function to generate services for a business type
  function generateServices(type:string) {
    const businessName = type === 'ULEPSAVANJE' ? 'BeautySpot' : 'HealthHub';
    const mainCategories = businessTypeToServiceCategories[type];
    let services: Service[] = [];
    for (const mainCategory in mainCategories) {
      const subCategories = mainCategories[mainCategory];
      subCategories.forEach(subCategory => {
        // services = services.concat(generateServicesFor(businessName, mainCategory, subCategory));
        services = services.concat([]);
      });
    }
    return services;
  }

  function generatePhoneNumber(index: number) {
    return `+381600000${index.toString().padStart(3, '0')}`;
  }

  function createBusiness(name:string, type:string, index:number) {
    const cities: {[key:string] : string} = {
      'Belgrade': '11000',
      'Novi Sad': '21000',
      'Nis': '18000'
    };
    const cityNames = Object.keys(cities);
    const selectedCity:string = cityNames[index % cityNames.length];

    return {
      name: name,
      phone: generatePhoneNumber(index),
      city: selectedCity,
      postalCode: cities[selectedCity],
      address: `Address for ${name}`,
      status: index % 2 === 0 ? 'Active' : 'Inactive',
      ownerEmail: `owner${index}@${name.toLowerCase().replace(/\s/g, '')}.com`,
      type: type,
      services: generateServices(type)
    };
  }
  const healthBusiness = createBusiness('HealthHub', 'MEDICINA', 1);
  const beautyBusiness = createBusiness('BeautySpot', 'ULEPSAVANJE', 2);

  return [healthBusiness, beautyBusiness];

}
