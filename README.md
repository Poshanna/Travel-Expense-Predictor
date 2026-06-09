# 🌍 Travel Expense Predictor & Travel Services

A smart travel planning web application that helps users estimate travel expenses, calculate travel distance, check weather conditions, analyze carbon footprint, and access useful travel services such as hotels, transport booking, food services, and emergency contacts.

---

## 🚀 Features

### 📍 Travel Expense Prediction
- Calculates distance between starting location and destination.
- Estimates travel expenses based on selected transport mode.
- Supports:
  - 🚗 Car
  - 🚆 Train
  - 🚌 Bus
  - ✈ Flight

### 📏 Distance Calculation
- Uses OpenStreetMap Nominatim API for geolocation.
- Calculates distance using the Haversine Formula.

### 🌤 Live Weather Information
- Displays weather information for the destination.
- Shows:
  - Weather Condition
  - Temperature
  - Humidity
  - Wind Speed

### 🌱 Carbon Footprint Analysis
- Calculates estimated CO₂ emissions based on:
  - Travel distance
  - Transport mode
- Provides sustainability rating:
  - 🟢 Eco Friendly
  - 🟡 Moderate
  - 🔴 High Emission

### 🏨 Travel Services
- Hotel Booking
- Transport Facilities
- Food Services
- Emergency Contacts
- Regional Travel Services

### 🚨 Emergency Contacts
- Police: 100
- Ambulance: 102
- Fire: 101

---

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- OpenStreetMap Nominatim API
- wttr.in Weather API
- Font Awesome Icons

---

## 📂 Project Structure

```text
Travel-Expense-Predictor/
│
├── index.html
├── styles.css
├── script.js
├── README.md
│
└── assets/
```

---

## ⚙️ How It Works

1. Enter Starting Location.
2. Enter Destination.
3. Select Mode of Transport.
4. Click **Calculate**.
5. The application:
   - Retrieves coordinates using OpenStreetMap.
   - Calculates distance using the Haversine Formula.
   - Estimates travel cost.
6. Navigate to:
   - Weather Information
   - Carbon Footprint Report
   - Travel Services

---

## 📊 Expense Calculation

| Transport Mode | Cost per KM (₹) |
|---------------|----------------|
| Car | 10 |
| Train | 5 |
| Bus | 3 |
| Flight | 20 |

---

## 🌱 Carbon Emission Factors

| Mode | CO₂ Factor (kg/km) |
|--------|---------------|
| Car | 0.12 |
| Bus | 0.05 |
| Train | 0.04 |
| Flight | 0.18 |

---

## 🎯 Key Functionalities

### Travel Expense Estimation
Provides an approximate travel budget based on distance and transport mode.

### Weather Monitoring
Allows users to check destination weather before traveling.

### Sustainability Awareness
Displays estimated carbon emissions and sustainability ratings.

### Travel Assistance
Provides quick access to:
- Hotel Booking
- Food Services
- Regional Travel
- Vehicle Rentals
- Online Ticket Booking

---

## 🔮 Future Enhancements

- Google Maps Integration
- OpenWeatherMap API Integration
- Hotel Recommendations Near Destination
- Nearby Restaurants Search
- AI-based Travel Recommendations
- Budget Optimization Suggestions
- Travel Itinerary Generator
- Route Visualization on Maps

---

## 📸 Screenshots

Add screenshots of:

1. Travel Expense Predictor
2. Services Dashboard
3. Weather Information
4. Carbon Footprint Report

inside a `screenshots/` folder and update the README.

---

## 👨‍💻 Author

**Durki Poshanna**

B.Tech - Artificial Intelligence & Machine Learning

Interested in:
- Web Development
- Machine Learning
- Artificial Intelligence
- Software Development

---

## 📜 License

This project is developed for educational and learning purposes.

Feel free to use and modify it for academic projects and personal learning.
