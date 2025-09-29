export interface ShowroomRequest {
  name: string;
  commercialRegistrationNumber: string;
  managerId?: number;
  contactNumber: string;
  address?: string;
}

export interface UpdateShowroomRequest {
  managerId?: number;
  contactNumber?: string;
  address?: string;
}

export interface ListShowroomResponse {
  id: number;
  name: string;
  commercialRegistrationNumber: string;
  contactNumber: string;
}

export interface ShowroomResponse {
  id: number; 
  name: string;
  commercialRegistrationNumber: string;
  manager: UserResponse;
  contactNumber: string;
  address: string;
}

export interface UserResponse {
  id: number;         
  firstName: string;
  lastName: string;
}
