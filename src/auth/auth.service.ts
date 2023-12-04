import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    const isPassMatch = await user.validatePassword(pass);
    console.log(user, isPassMatch);
    if (!isPassMatch) {
      throw new UnauthorizedException('Password not match');
    }
    console.log(user)
    const payload = { sub: user.id, username: user.username, };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getPermissions(id: number) {
    return this.usersService.findWithRelations(id)
  }
}
