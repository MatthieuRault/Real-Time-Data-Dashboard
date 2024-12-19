import { Controller, Get, Param, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private cryptoService: CryptoService) {}
  private cache = {
    topCryptos: {
      datas: [],
      timestamp: null,
    },
  };

  @Get()
  async getTopCryptos(@Query('limit') limit: number) {
    if (this.cache.topCryptos.timestamp && Date.now() - this.cache.topCryptos.timestamp < 60000) {
      return this.cache.topCryptos.datas;
    }
    const topCryptos = await this.cryptoService.getTopCryptos(limit);
    this.cache.topCryptos = { datas: topCryptos, timestamp: Date.now() };
    return topCryptos;
  }

  @Get(':id')
  async getCryptoById(@Param('id') id: string) {
    if (
      this.cache[id] &&
      this.cache[id].timestamp &&
      Date.now() - this.cache[id].timestamp < 60000
    ) {
      return this.cache[id].datas;
    }
    const crypto = await this.cryptoService.getCryptoById(id);
    this.cache[id] = { datas: crypto, timestamp: Date.now() };
    return crypto;
  }
}
