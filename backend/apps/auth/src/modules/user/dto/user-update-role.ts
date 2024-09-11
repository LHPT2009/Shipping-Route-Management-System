import { IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
  
@InputType()
export class UserUpdateRoleDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    roles?: string;
}
  