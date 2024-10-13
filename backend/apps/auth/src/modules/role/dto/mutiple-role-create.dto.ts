import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMutipleRoleDto {
    @Field(() => [String])
    @IsArray({ message: 'Names must be an array' })
    @ArrayNotEmpty({ message: 'Files must not be empty' })
    @IsString({ each: true, message: 'Each name must be a string' })
    @IsNotEmpty({ each: true, message: 'Each name must not be empty' })
    names: string[];
}
