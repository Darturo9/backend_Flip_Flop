import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    // agrega más campos si los incluyes en el JWT
  };
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService, // Assuming you want to use AuthService here
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(createUserDto);
    return res.json({ user });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.json({ message: 'Logout exitoso' });
  }

  @Get('google/:googleId')
  async findByGoogleId(@Param('googleId') googleId: string, @Res() res: Response) {
    // Busca el usuario por googleId en la base de datos
    const user = await this.usersService.findByGoogleId(googleId);
    if (user) {
      return res.json({ user });
    } else {
      return res.json({ user: null });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: AuthenticatedRequest) {
    // Log para depuración
    console.log('Cookies recibidas:', req.cookies);
    const userId = req.user?.userId;
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('ID de usuario inválido en el token');
    }
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    return { user };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
