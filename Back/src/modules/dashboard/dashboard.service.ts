import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Dashboard } from './dashboard.model';
import { WidgetService } from '../widgets/widget.service';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('Dashboard') private dashboardModel: Model<Dashboard>,
    private widgetService: WidgetService,
  ) {}

  async createDashboard(name: string): Promise<Dashboard> {
    // const code = Math.random().toString(36).substring(7);
    const code = uuidv4().substring(0, 6);
    const newDashboard = new this.dashboardModel({ name, code });
    return newDashboard.save();
  }

  async getDashboardByCode(code: string) {
    const dashboard = await this.dashboardModel.findOne({ code });
    const widgets = await this.widgetService.getWidgetsByDashboardId(dashboard._id.toString());
    return { dashboard, widgets };
  }
}
