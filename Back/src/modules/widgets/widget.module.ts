import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WidgetSchema } from './widget.model';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Widget', schema: WidgetSchema }])],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
