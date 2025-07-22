import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Formation } from './formation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Formation)
    private readonly formationRepository: Repository<Formation>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { username } })) || undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { email } })) || undefined;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async createUser(user: { username: string; email: string; password: string; role: string }): Promise<User> {
    const newUser = this.userRepository.create({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role as any,
    });
    return this.userRepository.save(newUser);
  }

  async createFormation(titre: string, description?: string): Promise<Formation> {
    const formation = this.formationRepository.create({ titre, description });
    return this.formationRepository.save(formation);
  }

  async getFormations(): Promise<Formation[]> {
    return this.formationRepository.find();
  }

  async inscrireUserAFormation(userId: number, formationId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['formations'] });
    const formation = await this.formationRepository.findOne({ where: { id: formationId } });
    if (!user || !formation) throw new Error('Utilisateur ou formation introuvable');
    user.formations = user.formations ? [...user.formations, formation] : [formation];
    return this.userRepository.save(user);
  }
}
