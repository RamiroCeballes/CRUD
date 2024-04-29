import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository (User)
  private userRepository: Repository <User>

  public async create(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.save(createUserDto);
      return {
          statusCode:200,
          msg: 'Se realizó con éxito la inserción.',
      };
  }
  catch (error){
      return new BadRequestException(error);
  }
  }

  public async findAll() {
    var resultado: any
    try {
      resultado = await this.userRepository.find();
      return resultado;
  }
  catch (error){
      return new BadRequestException(error);
  }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
