// import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
// import RouteInterface from '../../database/interface/route.interface';

// export class CreateRoutesDto implements Omit<RouteInterface, 'id'> {
//   @IsString()
//   @IsNotEmpty()
//   readonly name: string;

//   @IsOptional()
//   @IsNumber()
//   readonly locationId?: number;

//   @IsOptional()
//   @IsNumber()
//   readonly transportId?: number;
// }

// export class UpdateRoutesDto implements Partial<RouteInterface> {
//   @IsOptional()
//   @IsString()
//   readonly name?: string;

//   @IsOptional()
//   @IsNumber()
//   readonly locationId?: number;

//   @IsOptional()
//   @IsNumber()
//   readonly transportId?: number;
// }
