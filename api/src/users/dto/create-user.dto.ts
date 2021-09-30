import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'email@email.com' })
    email: string;

    @ApiProperty({ example: 'password' })
    password: string;

    @ApiProperty({ example: 'firstName' })
    firstName: string;
}