import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from 'src/common/utils/validations/JoinValidationPipe';
import {
  schemaUpdateUser,
  schemaNewUser,
} from 'src/schemaValidation/users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new_user')
  async create(
    @Body(new JoiValidationPipe(schemaNewUser)) createUserDto: CreateUserDto,
  ) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto = {
      ...createUserDto,
      password: hash,
      created_on: new Date(),
    };
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(schemaUpdateUser)) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
