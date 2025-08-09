import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PhonesService {

  constructor(
    @InjectRepository(Phone) private readonly phoneRepository: Repository<Phone>,
  ) { }

  create(createPhoneDto: CreatePhoneDto) {
    return 'This action adds a new phone';
  }

  async findAllByUser(userId: number) {
    return this.phoneRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: number) {
    return this.phoneRepository.findOne({ where: { id } });
  }

  update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return `This action updates a #${id} phone`;
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const phone = await this.phoneRepository.findOne({ where: { id, user: { id: userId } } });
    if (!phone) {
      return false;
    }
    await this.phoneRepository.remove(phone);
    return true;
  }
}
