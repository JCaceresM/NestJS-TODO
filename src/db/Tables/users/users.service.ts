import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Equal } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({
      status: Equal('A'),
    });
  }

  async findOne(user_id: string): Promise<GetUserDto | undefined> {
    const [user] = await this.userRepository.find({
      where: { user_id: user_id, status: Equal('A') },
    });
    if (!user) {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    return user as GetUserDto;
  }

  async findByUserName(username: string): Promise<GetUserDto | undefined> {
    const [user] = await this.userRepository.find({
      where: { username: username, status: Equal('A') },
    });
    if (!user) {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    return user as GetUserDto;
  }

  async update(id: number | string, updateUserDto: UpdateUserDto) {
    const todo = await this.userRepository.findOneOrFail(id);
    if (!todo.user_id && todo.status != 'A') {
      throw new HttpException({ status: 404, message: 'User no found' }, 404);
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.update(id, { ...user, status: 'D' });
    return { status: 200, massage: `User with id ${id} was deleted` };
  }
}
