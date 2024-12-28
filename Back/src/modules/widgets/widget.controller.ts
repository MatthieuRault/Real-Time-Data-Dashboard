import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { WidgetService } from './widget.service';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Post()
  async createWidget(@Body() widget: any) {
    try {
      const newWidget = await this.widgetService.createWidget(widget);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Widget created successfully',
        data: newWidget,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getWidgets() {
    try {
      const widgets = await this.widgetService.getWidgets();
      if (widgets.length === 0) {
        return {
          statusCode: HttpStatus.NO_CONTENT,
          message: 'No widgets found',
          data: [],
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Widgets retrieved successfully',
        data: widgets,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateWidget(@Param('id') id: string, @Body() widget: any) {
    try {
      const updatedWidget = await this.widgetService.updateWidget(id, widget);
      if (!updatedWidget) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Widget not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Widget updated successfully',
        data: updatedWidget,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteWidget(@Param('id') id: string) {
    try {
      const deletedWidget = await this.widgetService.deleteWidget(id);
      if (!deletedWidget) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Widget not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Widget deleted successfully',
        data: deletedWidget,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
