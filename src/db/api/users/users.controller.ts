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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { GetUserDto } from './dto/get-user.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new_user')
  async create(
    @Body(new JoiValidationPipe(schemaNewUser)) createUserDto: CreateUserDto,
  ):Promise<CreateUserDto> {
    
    createUserDto = {
      ...createUserDto,
      created_on: new Date(),
    };
    return this.usersService.create(createUserDto);
  }
  @ApiHeader({
    name: 'Authentication',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Get()
  @ApiResponse({ status: 201, description: 'The record has been successfully got.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthenticated.'})
  findAll() {
    return this.usersService.findAll();
  }

  @ApiHeader({
    name: 'Authentication',
    description: 'Bearer token',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Get('/user/:id')
  @ApiHeader({
    name: 'Authentication',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 201, description: 'The record has been successfully got.'})
  @ApiResponse({ status: 404, description: 'The record not fount.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthenticated.'})
  findOne(@Param('id') id: string):Promise<GetUserDto> {
    return this.usersService.findOne(id);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Patch('/update/:id')
  @ApiHeader({
    name: 'Authentication',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 201, description: 'The record has been Updated.'})
  @ApiResponse({ status: 404, description: 'The record not fount.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthenticated.'})
  update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(schemaUpdateUser)) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN)
  @Delete('/delete/:id')
  @ApiHeader({
    name: 'Authentication',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 201, description: 'The record has been deleted.'})
  @ApiResponse({ status: 404, description: 'The record not fount.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiResponse({ status: 401, description: 'Unauthenticated.'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
