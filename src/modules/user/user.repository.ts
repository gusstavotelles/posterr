import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async insertUpdate(newUser: CreateUserDto) {
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

//   async findOne(document: string) {
//     return this.userRepository.findOne({ where: { document: document } });
//   }
}
