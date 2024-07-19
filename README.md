# Into the Valley

[Into the Valley Business App](https://into-the-valley-business.vercel.app/) is a full-stack application designed for a rental resort business to managing bookings, guests, and cabins located in the Stardew Valley. This application provides a wide range of features to assist in the operation, offering a one-stop solution for managers to handle rentals smoothly.

In addition, I have developed a [client-facing website](https://into-the-valley-website.vercel.app/) for this business. [[GitHub].](https://github.com/W-Tania/into-the-valley-website) Both the business app and the client-facing app communicate with the back-end database using RESTful APIs, allowing data about bookings, cabins, and guests to be shared between the apps.

## Features:
* **Booking Management**: Create, update, and delete of booking. Filter and sort existed bookings.
* **Guest Management**: Register, update and delete guest-related information.
* **Cabin Management**: Create, update, and delete cabin details and upload photos. Filter and sort of cabins.
* **Dashboard**: Visualized charts and sales for booking information, simplified check-in and check-outs of guests on that day.
* **User Authentication**: Secure login and authentication system for users. Only existing user(hotel staff) could signup new users. Created users can update account details and reset password.
* **System Setting**: Configure and customize settings that apply to all bookings with ease.
* **Dark Mode**: Dark mode to follow device.
* **Responsive design**: Ensure compatibility across devices.
* **Real-Time Booking Validation**: Prevent doublebooking and check for available time slots while making bookings.

## Technology:
Into the Valley is built using React framework and Supabase as the backend, providing a modern and scalable architecture. The application is designed with a focus on reusability, scalability, and performance.

* **RESTful APIs**: API seamlessly integrated to manager server state and global state.
* **Supabase**: A open-source Firebase alternative database that utilizes the Postgres architecture.
* **Tanstack React Query**: Used with RESTFUL APIs to manage global and server state with Supabase.
* **React Hook Form**: Handle form state, validation and submission.
* **React Router**: Navigation between pages.
* **Styled Components**: CSS styling solution.
* **Error Boundary**: Catch errors in the child component tree.
* **Recharts**: A charting library to display charts and statistics.
* **Framer Motion**: Animation in Modal and form elements.
* **React day picker**: Calendar library used to select data while make bookings.
* **Reusable Components**: Designed with reusability in mind, components can be easily integrated and adapted across the application.
* **Compound Components**: A pattern used to build complex UI such as modals and tables.
* **Custom Hooks**: To manage state and logic across the application.

## Preview - Desktop & Dark Mode:
<img width="1440" alt="Screenshot 2024-07-19 at 10 28 34 am" src="https://github.com/user-attachments/assets/44b64242-c1e8-4eae-bfce-cfd1006daf78">
<img width="1440" alt="Screenshot 2024-07-19 at 10 29 25 am" src="https://github.com/user-attachments/assets/1b208f75-138a-4362-8b72-15a4615420f2">
<img width="1440" alt="Screenshot 2024-07-19 at 10 29 35 am" src="https://github.com/user-attachments/assets/62eef9bf-359f-445c-95e3-7805fba35b44">

## Preview - Tablet & Light Mode:
<img width="381" alt="Screenshot 2024-07-19 at 10 42 06 am" src="https://github.com/user-attachments/assets/7e3e6cb9-6afe-440c-a206-375d5c03c0ca">
<img width="384" alt="Screenshot 2024-07-19 at 10 42 15 am" src="https://github.com/user-attachments/assets/5b1975bf-ff2a-4137-ad92-3b9aba028879">
<img width="383" alt="Screenshot 2024-07-19 at 10 42 40 am" src="https://github.com/user-attachments/assets/e321cab1-433f-44e9-b15a-a0f84cb3120b">

## Preview - Phone & Dark Mode:
<img width="310" alt="Screenshot 2024-07-19 at 10 46 38 am" src="https://github.com/user-attachments/assets/fbc53589-a2b8-439b-bcbc-46b9b1c498a9">
<img width="309" alt="Screenshot 2024-07-19 at 10 46 51 am" src="https://github.com/user-attachments/assets/1ea811ec-af10-406b-8fdd-d9f70a6a9e05">
