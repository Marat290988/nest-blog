import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { AdminRepository } from '../../admin/service/admin.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private adminRepository: AdminRepository
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
  
}