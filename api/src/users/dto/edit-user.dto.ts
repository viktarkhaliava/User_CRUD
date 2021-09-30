import { ApiProperty } from "@nestjs/swagger";

export class EditUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;
}