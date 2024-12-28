import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post()
  async createWidget(@Body() widget: any) {
    return this.widgetService.createWidget(widget);
  }

  @Get()
  async getWidgets() {
    return this.widgetService.getWidgets();
  }

  @Put(':id')
  async updateWidget(@Param('id') id: string, @Body() widget: any) {
    return this.widgetService.updateWidget(id, widget);
  }

  @Delete(':id')
  async deleteWidget(@Param('id') id: string) {
    return this.widgetService.deleteWidget(id);
  }
}
