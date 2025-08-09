import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) { }

  @Post()
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.userId;
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('ID de usuario inválido en el token');
    }
    return this.phonesService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phonesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto) {
    return this.phonesService.update(+id, updatePhoneDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.userId;
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('ID de usuario inválido en el token');
    }
    const deleted = await this.phonesService.remove(+id, userId);
    if (!deleted) {
      throw new NotFoundException('Teléfono no encontrado o no autorizado');
    }
    return { message: 'Teléfono eliminado' };
  }
}
