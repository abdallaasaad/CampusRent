# CampusRent

**Full-stack Student Apartments Marketplace**

CampusRent is a platform dedicated to university students searching for off‑campus housing. It consists of a React front‑end (port 3000) and a Node.js/Express back‑end with MongoDB (port 3001), supporting three roles: Students, Business Owners, and Admins. Users can browse, search, post, edit, and manage apartment listings with role-based permissions.

---

## Features

- **Authentication & Authorization**  
  - **Students** browse & search apartment listings; view owner contact.  
  - **Business Owners** add, edit, delete their own listings; manage “My Apartments.”  
  - **Admins** view, edit, delete any user or listing; full site oversight.  
- **Apartment Listings**  
  - Fields: title, description, price, location, image URL, creation date.  
  - Search by title, location, or date‑range.  
- **Admin Dashboard**  
  - Tabbed interface: manage Users / manage Apartments.  
  - Edit user profiles (name, phone, address, image).  
  - Edit any apartment listing.  
- **Responsive UI** built with React Router v6, Context API, SweetAlert2 modals.  

---

## Prerequisites

- **Node.js** v14 or higher  
- **npm** v6 or higher  
- **MongoDB** instance (local or Atlas)  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/abdallaasaad/campusrent.git
   ```

2. **Server setup**  
   ```bash
   cd campusrent/server
   npm install
   ```

3. **Client setup**  
   ```bash
   cd ../client
   npm install
   ```

---

## Environment Variables

### Server

In `server/.env`:
```ini
PORT=3001
DATABASE_CONNECTION=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Client (optional)

In `client/.env`:
```ini
REACT_APP_BASE_URL=http://localhost:3001
```

---

## Running the Application

### Start the back‑end API

```bash
cd server
npm run dev
```
The API will listen on **http://localhost:3001**.

### Start the front‑end

```bash
cd client
npm start
```
The React app opens at **http://localhost:3000**.

---

## Folder Structure

```
campusrent/
├── server/                # Express API
│   ├── config/            # Configuration (JWT, DB)
│   ├── middlewares/       # Auth & role middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── seed.js            # Database seeder (50 users, cards)
│   ├── app.js             # Entry point
│   └── package.json
└── client/                # React front‑end
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── context/       # AuthContext (JWT, role redirect)
    │   ├── pages/         # Screens (Home, Login, Dashboards, Edit)
    │   ├── routes/        # Protected routing (AppRoutes.jsx)
    │   ├── styles/        # CSS files
    │   └── index.js
    └── package.json
```

---

## Available Scripts

In the **client** directory:
- `npm install` – install the necessery packages
- `npm start` – run React dev server  
- `npm run build` – build production bundle  

In the **server** directory:
- `npm install` – install the necessery packages
- `npm run dev` – run API with nodemon  
- `npm start` – run API once  

---

## API Endpoints

| Method | Endpoint              | Description                          |
| ------ | --------------------- | ------------------------------------ |
| POST   | `/users`              | Register new user                    |
| POST   | `/users/login`        | Authenticate, receive JWT            |
| GET    | `/users/me`           | Get current user profile             |
| GET    | `/users/:id`          | Get any user (admin or self)         |
| PUT    | `/users/:id`          | Update user (admin or self)          |
| DELETE | `/users/:id`          | Delete user (admin only)             |
| GET    | `/cards`              | List all apartment cards             |
| GET    | `/cards/my-cards`     | List current user’s cards            |
| POST   | `/cards`              | Create new card (business only)      |
| GET    | `/cards/:id`          | Get card details                     |
| PUT    | `/cards/:id`          | Update card (owner or admin)         |
| DELETE | `/cards/:id`          | Delete card (owner or admin)         |

---

## Technologies Used

- **Back‑end**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt  
- **Front‑end**: React, React Router v6, Context API, Fetch API, SweetAlert2  

---

## GitHub Repository

**Frontend & Backend** separated into two folders in one repo:  
https://github.com/abdallaasaad/campusrent

---

## Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Add feature"`)  
4. Push (`git push origin feature-name`)  
5. Open a Pull Request  

---

## License

This project is licensed under the MIT License.

---

## Contact

**Abdalla Alfareed**  
- Email: abdallalfareed@gmail.com  
- GitHub: https://github.com/abdallaasaad  
