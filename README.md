# Into the Valley

[Into the Valley Business App](https://into-the-valley-business.vercel.app/) is a full-stack application designed for a rental resort business to managing bookings, guests, and cabins located in the Stardew Valley. This application provides a wide range of features to assist in the operation, offering a one-stop solution for managers to handle rentals smoothly.

In addition, I have developed a [client-facing website](https://into-the-valley-website.vercel.app/) for this business. [[GitHub].](https://github.com/W-Tania/into-the-valley-website) Both the business app and the client-facing app communicate with the back-end database using RESTful APIs, allowing data about bookings, cabins, and guests to be shared between the apps.

## Features:
* **Booking Management**: Create, update, and delete of booking. Filter and sort of existed bookings.
* **Guest Management**: Register, update and delete guest-related information.
* **Cabin Management**: Create, update, and delete of cabin details and upload photos. Filter and sort of cabins.
* **Dashboard**: Visualized charts and sales for booking information, simplified check-in and check-outs of guests on that day.
* **User Authentication**: Secure login and authentication system for users. Only existing user(hotel staff) could signup new users. Created user can update account details and reset password.
* **System Setting**: Configure and customize setting that applies to all bookings with ease.
* **Dark Mode**: Dark mode to follow device.
* **Responsive design**.
* **Real-Time Booking Validation**: Prevent doublebooking while making bookings.

## Technology:
Into the Valley is built using React framework and Supabase as the backend. Providing a modern and scalable architecture. The application is designed with a focus on reusability, scalability, and performance.

* **RESTful APIs**: 
* *Supabase**: Backend database
* Tanstack React Query - State management
* React Hook Form - Handle form state, validation and submission
* React Router - Navigation
* Styled Components
* Error Boundary
* Recharts - Charting library for display charts and statistics 
* Framer Motion - Animation
* React day picker - Calendar library
* Reusable Components
* Compound Components
* Custom Hooks
