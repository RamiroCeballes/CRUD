import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  @InjectRepository (User)
  private userRepository: Repository <User>
 
  public async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.pass, saltRounds);
      var NewDTO : CreateUserDto;
      NewDTO = {
        user:createUserDto.user,
        pass:hashedPassword
      }
      await this.userRepository.save(NewDTO);
      return {
          statusCode:200,
          msg: 'Se realizó con éxito la inserción.',
      };
  }
  catch (error){
      return new BadRequestException(error);
  }
  }
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
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

  public async findOne(id: number) {
    var resultado: any
    try {
      resultado = await this.userRepository.findOne({where: {id: id}});
      return resultado;
  }
  catch (error){
      return new BadRequestException(error);
  }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
      try {
        await this.userRepository.createQueryBuilder()
        .update(User)
        .set({ user: updateUserDto.user,
              pass: updateUserDto.pass
         })
        .where("id = :id", { id: id })
        .execute();
        return {
          statusCode:200,
          msg: 'Se realizó con éxito la modificación.',
      };
    }
    catch (error){
        return new BadRequestException(error);
    }
    }

    async remove(id: number) {
      try {
        await this.userRepository.delete(id);
        return {
          statusCode:200,
          msg: 'Se realizó con éxito la eliminación.',
      };
    }
    catch (error){
        return new BadRequestException(error);
    }
    }
}
