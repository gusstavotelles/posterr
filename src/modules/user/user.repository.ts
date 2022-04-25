import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private usersMock: User[] = [
    {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      date_joined: '2020-03-01T00:00:00.000Z',
      followers: [],
      following: [],
    },
    {
      id: '2',
      name: 'Jane Doe',
      username: 'janedoe',
      date_joined: '2019-01-01T00:00:00.000Z',
      followers: [],
      following: [],
    },
    {
      id: '3',
      name: 'John Smith',
      username: 'johnsmith',
      date_joined: '2019-04-01T00:00:00.000Z',
      followers: [],
      following: [],
    },
    {
      id: '4',
      name: 'Gustavo Telles',
      username: 'gustavotelles',
      date_joined: '2019-01-11T00:00:00.000Z',
      followers: [],
      following: [],
    },
    {
      id: '5',
      name: 'Hector Soares',
      username: 'hectorsoares',
      date_joined: '2019-12-01T00:00:00.000Z',
      followers: [],
      following: [],
    },
  ];

  async generateUsers(): Promise<User[]> {
    let result: User[] = [];
    this.usersMock.forEach(async (user) => {
      result.push(await this.userRepository.save(user));
    });
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
