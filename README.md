# car-showroom-frontend

# Prerequisites

Make sure you have the following installed:

Node.js (v22.17.0)
Angular CLI 

# 1. Clone the repository
git clone https://github.com/Ghaidaa11/car-showroom-frontend.git

# 2. Install dependencies
npm install

# 3. Run the development server
npm start

## End points:
# Showrooms APIs
1- getShowrooms: 

Method:GET
API: /api/v1/car-showroom?page=1&size=10&sortDir=asc&sortBy=name

2- createShowroom:

Method: POST
API: /api/v1/car-showroom

3- getCarShowroom

Method: GET
API:/api/v1/car-showroom/:id

4- updateCarShowroom:

Method: PATCH
API:/api/v1/car-showroom/:id

5-deleteCarShowroom

Method: DELETE
API: /api/v1/car-showroom/:id

6- listCars
Method: GET
API: /api/v1/car-showroom/list

# Car APIs
1- createCar

Method: POST
API: /api/v1/car

2- listCars

Method: POST
API: /api/v1/car/list?page=1&size=10

# Managers

1- getManagers

Method: GET
API: /api/v1/users/managers

