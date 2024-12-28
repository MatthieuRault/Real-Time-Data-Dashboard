import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  async createDashboard(@Body('name') name: string) {
    return this.dashboardService.createDashboard(name);
  }

  @Get(':code')
  async getDashboardByCode(@Param('code') code: string) {
    return this.dashboardService.getDashboardByCode(code);
  }
}
