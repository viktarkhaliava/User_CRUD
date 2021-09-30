import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Post()
    public async createUser(@Body() createUser: CreateUserDto): Promise<any> {
        return this.usersService.createUser(createUser);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: 'string' })
    public async editUser(@Param('id') id: string, @Body() editUser: EditUserDto): Promise<any> {
        return this.usersService.editUser(id, editUser);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: 'string' })
    public async deleteUser(@Param('id') id: string): Promise<string> {
        return this.usersService.deleteUser(id);
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'string' })
    public async getOneUser(@Param('id') id: string): Promise<UserDto> {
        return this.usersService.findOne(id);
    }

    @Get()
    public async getAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }
}
