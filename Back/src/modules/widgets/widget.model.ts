import { Document, model, Schema } from 'mongoose';
export interface Widget extends Document {
  positionX: number;
  positionY: number;
  category: string;
  parameters: {
    city?: string;
    apiUrl: string;
    name?: string;
    type?: 'top' | 'single';
  };
  dashboard_id: string;
}

export const WidgetSchema = new Schema<Widget>({
  positionX: {
    type: Number,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  parameters: {
    city: String,
    apiUrl: {
      type: String,
      required: true,
    },
    name: String,
    type: {
      type: String,
      enum: ['top', 'single'],
    },
  },
  dashboard_id: {
    type: String,
    required: true,
  },
});

WidgetSchema.index({ dashboard_id: 1 });

export const WidgetModel = model<Widget>('Widget', WidgetSchema);
