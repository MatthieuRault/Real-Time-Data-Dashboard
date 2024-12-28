import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardSchema } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { WidgetModule } from '../widgets/widget.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Dashboard', schema: DashboardSchema }]),
    WidgetModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
