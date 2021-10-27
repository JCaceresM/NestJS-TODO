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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../users/dto/create-user.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('roles')
@ApiHeader({
  name: 'Authentication',
  description: 'Bearer token',
})
@ApiResponse({ status: 403, description: 'Forbidden.'})
@ApiResponse({ status: 401, description: 'Unauthenticated.'})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @hasRoles(Role.ADMIN)
  @Post('new_role')
  @ApiResponse({ status: 201, description: 'The record has been successfully saved.'})
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @hasRoles(Role.ADMIN)
  @ApiResponse({ status: 200, description: 'The records has been successfully got.'})
  @Get('/all')
  findAll() {
    return this.rolesService.findAll();
  }

  @hasRoles(Role.ADMIN)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully got.'})
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @hasRoles(Role.ADMIN)
  @Patch('/update/:id')
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @hasRoles(Role.ADMIN)
  @Delete(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully deleted.'})
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
