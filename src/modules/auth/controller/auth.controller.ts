import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { AdminEntity } from '../../admin/model/admin.entity';
import { Connection, Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  private adminRepository: Repository<AdminEntity>;

  constructor(
    private connection: Connection,
    private authService: AuthService,
  ) {
    this.adminRepository = this.connection.getRepository(AdminEntity);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin: AdminEntity = await this.adminRepository.findOne(req.user.id);
    return this.authService.login(admin);
  }
  
}