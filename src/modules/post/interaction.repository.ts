import { Injectable } from '@nestjs/common';
import { Interaction } from './entities/interaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInteraction } from './entities/interaction.entity';

@Injectable()
export class InteractionRepository {
  constructor(
    @InjectRepository(Interaction)
    private interactionRepository: Repository<Interaction>,
  ) {}

  async insert(newInteraction: IInteraction): Promise<Interaction> {
    const result = await this.interactionRepository.save(newInteraction);
    return result;
  }
}
