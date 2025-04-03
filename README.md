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
  discounts: [
    {
      code: "SUMMER2025",
      amount: 10,
      type: "PERCENT",
      available: true,
      startDate: "2025-06-01T00:00:00Z",
      endDate: "2025-06-30T23:59:59Z",
      minimumPurchase: 50,
      
    },
    {
      code: "FREESHIP",
      amount: 5,
      type: "FLAT",
      available: true,
      startDate: "2025-03-01T00:00:00Z",
      endDate: "2025-12-31T23:59:59Z",
      minimumPurchase: 100,
      
    },
    {
      code: "CLEARANCE30",
      amount: 30,
      type: "PERCENT",
      available: true,
      startDate: "2025-04-01T00:00:00Z",
      endDate: "2025-04-30T23:59:59Z",
      minimumPurchase: 20,
      
    },
    {
      code: "SAVE10NOW",
      amount: 10,
      type: "FLAT",
      available: true,
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-12-31T23:59:59Z",
      minimumPurchase: 0,
      
    },
    
  ],
  coupons: [
    {
      code: "BBSWIMPH2025",
      amount: 20,
      type: "PERCENT",
      available: true,
      conditions: [
        "FREE_SHIPPING"
      ],
      startDate: "2025-05-01T00:00:00Z",
      endDate: "2025-05-31T23:59:59Z",
      
    },
    {
      code: "HOLIDAYSALE",
      amount: 50,
      type: "FLAT",
      available: false,
      conditions: [
        "LAST_STOCK",
        "DISCOUNT"
      ],
      startDate: "2025-11-01T00:00:00Z",
      endDate: "2025-11-30T23:59:59Z",
      
    },
    {
      code: "WELCOME50",
      amount: 50,
      type: "FLAT",
      available: true,
      conditions: [
        "NEW_USER"
      ],
      startDate: "2025-01-01T00:00:00Z",
      endDate: "2025-06-30T23:59:59Z",
      
    },
    
  ],
  products: [
    {
      id: "p1",
      name: "T-Shirt",
      description: "Classic cotton t-shirt with a comfortable fit and stylish design.",
      size: "LARGE",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "DISCOUNT",
        "LAST_STOCK"
      ],
      stock: 100,
      image: "https://picsum.photos/id/237/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p2",
      name: "Sneakers",
      description: "Lightweight athletic sneakers perfect for running or casual wear.",
      size: "MEDIUM",
      amount: 55,
      tags: [
        "DISCOUNT",
        "LAST_STOCK",
        "FREE_SHIPPING"
      ],
      stock: 50,
      image: "https://picsum.photos/id/21/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p3",
      name: "Smartwatch",
      description: "Feature-rich smartwatch with health tracking and notifications.",
      size: "SMALL",
      amount: 55,
      tags: [
        "LAST_STOCK",
        "DISCOUNT",
        "FREE_SHIPPING"
      ],
      stock: 30,
      image: "https://picsum.photos/id/48/200/300",
      discountCode: "CLEARANCE30",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p4",
      name: "Backpack",
      description: "Durable backpack with multiple compartments and water-resistant material.",
      size: "MEDIUM",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "DISCOUNT",
        "LAST_STOCK"
      ],
      stock: 60,
      image: "https://picsum.photos/id/119/200/300",
      discountCode: null,
      category: "Dusk Eyelit",
      
    },
    {
      id: "p5",
      name: "Headphones",
      description: "Noise-cancelling headphones with premium sound quality and comfort.",
      size: "LARGE",
      amount: 55,
      tags: [
        "DISCOUNT",
        "LAST_STOCK",
        "FREE_SHIPPING"
      ],
      stock: 80,
      image: "https://picsum.photos/id/367/200/300",
      discountCode: "FREESHIP",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p6",
      name: "Dara Side Tie Cheeky Bottoms",
      description: "Stylish swimwear bottoms with side ties and cheeky cut for a flattering fit.",
      size: "SMALL",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "LAST_STOCK",
        "DISCOUNT"
      ],
      stock: 45,
      image: "https://picsum.photos/id/64/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p7",
      name: "Dara Side Tie Cheeky Bottoms",
      description: "Classic black swimwear bottoms with adjustable side ties and cheeky cut.",
      size: "MEDIUM",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "LAST_STOCK",
        "DISCOUNT"
      ],
      stock: 38,
      image: "https://picsum.photos/id/65/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p8",
      name: "Dara Side Tie Cheeky Bottoms",
      description: "Neutral beige swimwear bottoms with side ties and comfortable fabric.",
      size: "LARGE",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "LAST_STOCK",
        "DISCOUNT"
      ],
      stock: 42,
      image: "https://picsum.photos/id/68/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p9",
      name: "Dara Side Tie Cheeky Bottoms",
      description: "Vibrant orange swimwear bottoms with adjustable side ties for a perfect fit.",
      size: "SMALL",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "LAST_STOCK",
        "DISCOUNT"
      ],
      stock: 35,
      image: "https://picsum.photos/id/91/200/300",
      discountCode: "SUMMER2025",
      category: "Dusk Eyelit",
      
    },
    {
      id: "p10",
      name: "Dara Side Tie Cheeky Bottoms ",
      description: "Earth-toned brown swimwear bottoms with side ties and cheeky design.",
      size: "MEDIUM",
      amount: 55,
      tags: [
        "FREE_SHIPPING",
        "LAST_STOCK"
      ],
      stock: 40,
      image: "https://picsum.photos/id/106/200/300",
      category: "Dusk Eyelit",
      
    },
    
  ],
  shipping: [
    {
      code: "s1",
      name: "DHL International Shippin",
      price: 16,
      discount: {
        minimumAmount: 500,
        maximumAmount: 1000,
        startDay: newDate("2025-06-01"),
        endDay: newDate("2025-06-30"),
        type: "PERCENTAGE",
        value: 100
      },
      
    },
    {
      code: "s2",
      name: "FedEX",
      price: 15
    },
    
  ],
  
}