
                  4: Data Schema Design for our car-rental MarketPlace: 

// User Schema

const user= {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "clerkId",
      type: "string",
      title: "Clerk ID",
    },
    {
      name: "wishlist",
      type: "array",
      title: "Wishlist",
      of: [{ type: "reference", to: [{ type: "car" }] }],
    },
  ],
};

export default user
// Car Schema

const Car = {
  name: "car",
  type: "document",
  title: "Car",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Car Name",
    },
    {
      name: "brand",
      type: "string",
      title: "Brand",
      description: "Brand of the car (e.g., Nissan, Tesla, etc.)",
    },
    {
      name: "type",
      type: "string",
      title: "Car Type",
      description: "Type of the car (e.g., Sport, Sedan, SUV, etc.)",
    },
    {
      name: "fuelCapacity",
      type: "string",
      title: "Fuel Capacity",
      description: "Fuel capacity or battery capacity (e.g., 90L, 100kWh)",
    },
    {
      name: "transmission",
      type: "string",
      title: "Transmission",
      description: "Type of transmission (e.g., Manual, Automatic)",
    },
    {
      name: "seatingCapacity",
      type: "string",
      title: "Seating Capacity",
      description: "Number of seats (e.g., 2 People, 4 seats)",
    },
    {
      name: "pricePerDay",
      type: "string",
      title: "Price Per Day",
      description: "Rental price per day",
    },
    {
      name: "originalPrice",
      type: "string",
      title: "Original Price",
      description: "Original price before discount (if applicable)",
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags for categorization (e.g., popular, recommended)",
    },
    {
      name: "image",
      type: "image",
      title: "Car Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200,
      },
    },
    {
      name: "description",
      type: "text",
      title: "Car Description",
      description: "Detailed description about the car, features, and specifications.",
    },
    {
      name: "availability",
      title: "Availability",
      type: "object",
      fields: [
        {
          name: "locations",
          title: "Available Locations",
          type: "array",
          of: [{ type: "string" }],
          description: "Locations where this car is available (e.g., Sadar, Clifton).",
        },
        {
          name: "availableDates",
          title: "Available Dates",
          type: "array",
          of: [{ type: "string" }],
          description: "Dates when the car is available (e.g., '2025-02-10', '2025-02-15').",
        },
        {
          name: "availableTimes",
          title: "Available Times",
          type: "array",
          of: [{ type: "string" }],
          description: "Times when the car is available (e.g., '08:00 AM', '12:00 PM').",
        },
      ],
    },
  ],
};

export default Car;

// Booking Schema

import { defineType } from "sanity";

const booking = defineType({
  name: "booking",
  title: "Bookings",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "town",
      title: "Town/City",
      type: "string",
    },
    {
      name: "rentalType",
      title: "Rental Type",
      type: "string",
    },
    {
      name: "pickUpLocation",
      title: "Pick-Up Location",
      type: "string",
    },
    {
      name: "pickUpDate",
      title: "Pick-Up Date",
      type: "datetime",
    },
    {
      name: "pickUpTime",
      title: "Pick-Up Time",
      type: "string",
    },
    {
      name: "dropOffLocation",
      title: "Drop-Off Location",
      type: "string",
    },
    {
      name: "dropOffDate",
      title: "Drop-Off Date",
      type: "datetime",
    },
    {
      name: "dropOffTime",
      title: "Drop-Off Time",
      type: "string",
    },
    {
      name: "amountPaid",
      title: "Amount Paid",
      type: "number",
      validation: (Rule) => Rule.min(0), // No explicit type needed
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["success", "failed"],
      },
    },
  ],
});

export default booking;

// Review Schema


// Payment Schema

export default {
  name: 'payment',
  type: 'document',
  fields: [
    { name: 'booking', type: 'reference', to: [{ type: 'booking' }], title: 'Booking' },
    { name: 'amount', type: 'number', title: 'Amount' },
    { name: 'paymentDate', type: 'datetime', title: 'Payment Date' },
    { name: 'paymentMethod', type: 'string', title: 'Payment Method', options: { list: ['Credit Card', 'Debit Card', 'PayPal', 'Cash'] } }
  ]
};
//Notification schema
const notification= {
    name: 'notification',
    title: 'Notification',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'message',
        title: 'Message',
        type: 'text',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
    ],
  };
  
  export default notification

                                simple Entity-Relationship Diagram (ERD)

Entities:
User
Attributes: Full Name, Email, Password, Contact Number, User Type (Renter/Owner)

Car
Attributes: Car Name, Car Brand, Car Type, Rental Price, Availability
Relationship: Belongs to one User (Owner)

Booking
Attributes: Start Date, End Date, Total Cost
Relationships:

Refers to one Car
Refers to one User (Renter)
Review
Attributes: Rating, Comment
Relationships:

Refers to one Car
Refers to one User (Reviewer)
Payment
Attributes: Amount, Payment Date, Payment Method
Relationship: Refers to one Booking

(diagram is provided to show the relation between entities in our marketplace)
