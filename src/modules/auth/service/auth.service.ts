import { AdminEntity } from '../../admin/model/admin.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  private adminRepository: Repository<AdminEntity>;

  constructor(
    private connection: Connection,
    private jwtService: JwtService
  ) {
    this.adminRepository = this.connection.getRepository(AdminEntity);
  }

//   async validateAdmin(login: string, pass: string): Promise<AdminEntity | null> {
//     const admin: AdminEntity = await this.adminRepository.findByLogin(login);

//     if (admin && admin.password === pass) {
//       const {password, ...secureAdmin} = admin;
//       return secureAdmin;
//     }

//     return null;
//   }

    async login(admin: AdminEntity) {
      const payload = { id: admin.id };
      return {
        accessToken: this.jwtService.sign(payload)
      }
    }

    async validateAdmin(login: string, pass: string): Promise<AdminEntity | null> {
        const admin: AdminEntity = await this.adminRepository.findOne({where: {login}});

        if (admin && await bcrypt.compare(pass, admin.passwordHash)) {
          const {passwordHash, ...secureAdmin} = admin;
          return secureAdmin;
        }

        return null;
    }
}