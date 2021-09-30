import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SESSenderService } from 'src/mail-sender/ses-sender.service';

import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
const crypto = require("crypto");

const users = [
];

@Injectable()
export class UsersService {
    constructor(
        private readonly sESSenderService: SESSenderService,
    ) {}
    public async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
        const check = users.find((u) => u.email === createUserDto.email);
        if (check) {
            throw new BadRequestException('User already exists');
        }
        const newUser = { ...createUserDto, id: crypto.randomBytes(16).toString("hex") };
        users.push(newUser);

        // await this.sESSenderService.sendMail(createUserDto.email, 'CreateUserTemplate', { firstName: createUserDto.firstName });
        return newUser;
    }

    public async editUser(id: string, editUserDto: EditUserDto): Promise<UserDto> {
        const userIndex = users.find((u) => u.id === id)
        if (userIndex !== -1) {
            users[userIndex] = { ...editUserDto, id: users[userIndex].id };
        }
        throw new NotFoundException('User not found');
    }

    public async deleteUser(id: string): Promise<string> {
        const userIndex = users.find((u) => u.id === id)
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
        } else {
            throw new NotFoundException('User not found');
        }
        return id;
    }

    public async findOne(id: string): Promise<UserDto> {
        const user = users.find((u) => u.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    public async findAll(): Promise<UserDto[]> {
        return users;
    }
}
