import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }


  async create(createUserDto: CreateUserDto) {
    try {
      // Buscar si ya existe el usuario por googleId o email
      const existingUser = await this.userRepository.findOne({
        where: [
          { googleId: createUserDto.googleId },
          { email: createUserDto.email }
        ]
      });

      if (existingUser) {
        // Opcional: puedes devolver el usuario existente o un mensaje
        return existingUser;
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByGoogleId(googleId: string) {
    // Busca el usuario por googleId en la base de datos
    return this.userRepository.findOne({ where: { googleId } });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
