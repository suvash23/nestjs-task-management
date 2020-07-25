import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { AuthCredentialsDto } from "./dto/auth.credentials.dto";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signUp(authCrdentialsDto: AuthCredentialsDto): Promise<void> {
    const user = new User();
    const { username, password } = authCrdentialsDto;
    user.salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    }
    catch (error) {
      console.log(error.code);
      //TODO: Fix UnhandledPromiseRejectionWarning
      // if (error.code === 'ER_DUP_ENTRY') {
      //   throw new ConflictException('Username already exists');
      // } else {
      //   throw new InternalServerErrorException();
      // }

    }
  }
  async validatePassword(authCrdentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCrdentialsDto;
    const user = await this.findOne({ username });
    //console.log(user);
    if (user && await user.validatePassword(password)) {
      //console.log(user.username);
      return user.username;
    } else {
      //console.log(null);
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}