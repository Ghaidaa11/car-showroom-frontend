export interface CarShowroomDto {
  name: string;
  contactNumber: string;
}

export interface CarResponseDto {
  vin: string;
  maker: string;
  model: string;
  modelYear: number;
  amount: number;
  carShowroom: CarShowroomDto;
}

export interface CarFilterRequest {
  vin?: string;
  maker?: string;
  model?: string;
  modelYear?: number;
  carShowroomName?: string;
}

export interface CarCreationRequest {
  vin: string;
  maker: string;
  model: string;
  modelYear: number;
  price: number;
  showroomId: number;
}
