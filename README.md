# Travel Tracker Frontend

This is the **React-based frontend** for the Travel Tracker system. It interacts with the backend REST API to allow users and administrators to manage and view flights, passengers, airports, gates, aircraft, cities, and airlines. It includes a landing homepage, styled admin panels, and flight tracking capabilities.

---

## Features

### Home Page
- Hero section with background image
- Airport selection dropdown
- Buttons to view Arrivals and Departures
- Styled with CSS and `@fortawesome/react-fontawesome`

### Admin Pages
Each admin page includes:
- A form to add new entries
- A styled table to display existing records
- Fully modular structure with CSS classes

#### FlightsAdminPage
- Add flights with dropdowns for:
  - Departure/Arrival airports
  - Gate
  - Airline
  - Aircraft
- Flight statuses include Scheduled, In Air, Landed, etc.
- Lists all flight records

#### AirlineAdminPage
- Add airlines with name and code
- List existing airlines

#### AirportAdminPage
- Add airports with name and code
- Dropdown to assign city

#### CityAdminPage
- Add cities with name, province, and population
- Lists cities in a table

#### PassengerAdminPage
- Add passengers with name, passport, phone, and city
- Multi-select for assigning flights
- Fully styled form and table

#### GateAdminPage
- Add gates with gate number, terminal, and airport
- Lists gate records with related airport

#### AircraftAdminPage
- Add aircrafts with model and capacity
- Assign to airline
- View all aircraft records

---

## 🛠️ Technologies Used

- React 18+
- CSS
- Axios
- React Router
- Font Awesome (`@fortawesome/react-fontawesome`)
- Custom `*.service.js` files for API interaction