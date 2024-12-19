import { Controller, Get, Param, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}

  @Get()
  async getTopCryptos(@Query('limit') limit: number) {
    return this.cryptoService.getTopCryptos(limit);
  }

  @Get(':id')
  async getCryptoById(@Param('id') id: string) {
    return this.cryptoService.getCryptoById(id);
  }
}
