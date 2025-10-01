import { Routes } from '@angular/router';
import { ShowroomForm } from './components/showroom/showroom-form/showroom-form';
import { ShowroomList } from './components/showroom/showroom-list/showroom-list';
import { ShowroomDetails } from './components/showroom/showroom-details/showroom-details';
import { ShowroomUpdate } from './components/showroom/showroom-update/showroom-update';
import { CarList } from './components/carComponents/car-list/car-list';
import { CarCreate } from './components/carComponents/car-create/car-create';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path:'showrooms',
        component: ShowroomList
    },
    {
        path: 'showrooms/create',
        component: ShowroomForm
    },
    {
        path:'showrooms/details',
        component: ShowroomDetails
    },
    {
        path: 'showrooms/update',
        component: ShowroomUpdate
    },
    {
        path: 'cars',
        component: CarList
    },
    {
        path:'cars/create',
        component: CarCreate
    },
    {
        path:'',
        component: Login
    }
];
