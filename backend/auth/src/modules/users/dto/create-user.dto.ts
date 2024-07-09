import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  // @ValidateIf(e => e.firstName !== '')
  firstName: string;

  @IsString()
  @IsNotEmpty()
  // @ValidateIf(e => e.lastName !== '')
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  // @ValidateIf(e => e.email !== '')
  email: string;

  @IsString()
  @IsNotEmpty()
  // @ValidateIf(e => e.password !== '')
  password: string;
}
