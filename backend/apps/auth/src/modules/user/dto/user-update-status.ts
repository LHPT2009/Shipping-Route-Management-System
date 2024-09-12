import { IsBoolean } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
  
@InputType()
export class UpdateStatusUserDto {
    @Field({ nullable: true })
    @IsBoolean()
    active: boolean;
}
  