export const baseUrl = 'http://localhost:8080';



export const End_POINTS = {
    SHOWROOM_LIST: {
        URL: '/api/v1/car-showroom'
    },
    SHOWROOM: {
        URL: (id: number) => `/api/v1/car-showroom/${id}`
    },
    MANAGERS: {
        URL: '/api/v1/users/managers'
    },
    CREATE_SHOWROOM: {
        URL: '/api/v1/car-showroom'
    },
    UPDATE_SHOWROOM: {
        URL: (id: number) => `/api/v1/car-showroom/${id}`
    },
    DELETE_SHOWROOM: {
        URL: (id: number) => `/api/v1/car-showroom/${id}`
    },
    CARS_LIST: {
        URL: (page: number, size: number) => `/api/v1/car/list?page=${page}&size=${size}`
    },
    CREATE_CAR: {
        URL: '/api/v1/car'
    },
    ALL_SHOWROOMS_AS_LIST: {
        URL: '/api/v1/car-showroom/list'
    },
    LOGIN: {
        URL: '/login'
    }
    
}