import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Widget } from './widget.model';

@Injectable()
export class WidgetService {
  constructor(@InjectModel('Widget') private widgetModel: Model<Widget>) {}

  async createWidget(widget: Partial<Widget>): Promise<Widget> {
    const newWidget = new this.widgetModel(widget);
    return newWidget.save();
  }

  async getWidgets(): Promise<Widget[]> {
    return this.widgetModel.find().exec();
  }

  async getWidgetsByDashboardId(dashboard_id: string): Promise<Widget[]> {
    return this.widgetModel.find({ dashboard_id }).exec();
  }

  async updateWidget(id: string, widget: Partial<Widget>): Promise<Widget> {
    return this.widgetModel.findByIdAndUpdate(id, widget, { new: true }).exec();
  }

  async deleteWidget(id: string): Promise<any> {
    return this.widgetModel.findByIdAndDelete(id).exec();
  }
}
