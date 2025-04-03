# Frontend Exam - Cart System

## Overview
This project is a frontend exam focused on implementing a cart system. The exact details of the requirements are hidden in the exam link.

## Features
- Add items to the cart
- Remove items from the cart
- Update item quantities
- View cart summary

## Technologies Used
- React 
- TypeScript 
- Tailwind CSS (if styling is included)
- Shadcn

## How to Run

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup
1. Clone the repository:
   ```sh
   git clone <repo-link>
   cd <repo-folder>
   ```

2. Install dependencies:
   ```sh
   npm install 
   ```

3. Start the development server:
   ```sh
   npm run dev  
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## Notes
- The exam details are hidden in the exam link.
- Follow the provided instructions to complete the project accordingly.

## License
This project is for examination purposes only and is not intended for production use.

---
Good luck with your frontend exam! 🚀



Here included the data in the system


{
  "discounts": [
    {
      "code": "SUMMER2025",
      "amount": 10,
      "type": "PERCENT",
      "available": true,
      "startDate": "2025-06-01T00:00:00Z",
      "endDate": "2025-06-30T23:59:59Z",
      "minimumPurchase": 50
    },
    {
      "code": "FREESHIP",
      "amount": 5,
      "type": "FLAT",
      "available": true,
      "startDate": "2025-03-01T00:00:00Z",
      "endDate": "2025-12-31T23:59:59Z",
      "minimumPurchase": 100
    },
    {
      "code": "CLEARANCE30",
      "amount": 30,
      "type": "PERCENT",
      "available": true,
      "startDate": "2025-04-01T00:00:00Z",
      "endDate": "2025-04-30T23:59:59Z",
      "minimumPurchase": 20
    },
    {
      "code": "SAVE10NOW",
      "amount": 10,
      "type": "FLAT",
      "available": true,
      "startDate": "2025-01-01T00:00:00Z",
      "endDate": "2025-12-31T23:59:59Z",
      "minimumPurchase": 0
    }
  ],
  "coupons": [
    {
      "code": "BBSWIMPH2025",
      "amount": 20,
      "type": "PERCENT",
      "available": true,
      "conditions": ["FREE_SHIPPING"],
      "startDate": "2025-05-01T00:00:00Z",
      "endDate": "2025-05-31T23:59:59Z"
    },
    {
      "code": "HOLIDAYSALE",
      "amount": 50,
      "type": "FLAT",
      "available": false,
      "conditions": ["LAST_STOCK", "DISCOUNT"],
      "startDate": "2025-11-01T00:00:00Z",
      "endDate": "2025-11-30T23:59:59Z"
    },
    {
      "code": "WELCOME50",
      "amount": 50,
      "type": "FLAT",
      "available": true,
      "conditions": ["NEW_USER"],
      "startDate": "2025-01-01T00:00:00Z",
      "endDate": "2025-06-30T23:59:59Z"
    }
  ],
  "products": [
    {
      "id": "p1",
      "name": "T-Shirt",
      "description": "Classic cotton t-shirt with a comfortable fit and stylish design.",
      "size": "LARGE",
      "amount": 55,
      "tags": ["FREE_SHIPPING", "DISCOUNT", "LAST_STOCK"],
      "stock": 100,
      "image": "https://picsum.photos/id/237/200/300",
      "discountCode": "SUMMER2025",
      "category": "Dusk Eyelit"
    },
    {
      "id": "p2",
      "name": "Sneakers",
      "description": "Lightweight athletic sneakers perfect for running or casual wear.",
      "size": "MEDIUM",
      "amount": 55,
      "tags": ["DISCOUNT", "LAST_STOCK", "FREE_SHIPPING"],
      "stock": 50,
      "image": "https://picsum.photos/id/21/200/300",
      "discountCode": "SUMMER2025",
      "category": "Dusk Eyelit"
    },
    {
      "id": "p3",
      "name": "Smartwatch",
      "description": "Feature-rich smartwatch with health tracking and notifications.",
      "size": "SMALL",
      "amount": 55,
      "tags": ["LAST_STOCK", "DISCOUNT", "FREE_SHIPPING"],
      "stock": 30,
      "image": "https://picsum.photos/id/48/200/300",
      "discountCode": "CLEARANCE30",
      "category": "Dusk Eyelit"
    }
  ],
  "shipping": [
    {
      "code": "s1",
      "name": "DHL International Shipping",
      "price": 16,
      "discount": {
        "minimumAmount": 500,
        "maximumAmount": 1000,
        "startDay": "2025-06-01",
        "endDay": "2025-06-30",
        "type": "PERCENTAGE",
        "value": 100
      }
    },
    {
      "code": "s2",
      "name": "FedEX",
      "price": 15
    }
  ]
}
