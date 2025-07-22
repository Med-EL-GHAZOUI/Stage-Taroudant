import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(username: string, email: string, password: string, role: string) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new Error('Nom d’utilisateur déjà utilisé.');
    }
    // Hasher le mot de passe
    const hashedPassword = await (this as any).usersService['hashPassword']
      ? await (this as any).usersService['hashPassword'](password)
      : await import('bcrypt').then(bcrypt => bcrypt.hash(password, 10));
    // Créer l'utilisateur avec le rôle fourni
    const user = await this.usersService.createUser({ username, email, password: hashedPassword, role });
    return { message: 'Inscription réussie', user: { id: user.id, username: user.username, email: user.email, role: user.role } };
  }

  async forgotPassword(email: string) {
    // Simuler la recherche d'utilisateur par email
    // Ici, on suppose que username = email si besoin
    // En vrai, il faudrait une méthode findByEmail
    // Simuler l'envoi d'un email
    return { message: 'Un email de réinitialisation a été envoyé si l’adresse existe.' };
  }
}
