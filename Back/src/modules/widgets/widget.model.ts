import { Document, Schema } from 'mongoose';

export interface Widget extends Document {
  name: string;
  type: 'weather' | 'crypto';
  config: any;
  position: { row: number; col: number }; // Position du widget dans le dashboard
}

export const WidgetSchema = new Schema<Widget>({
  name: { type: String, required: true }, // Nom du widget
  type: { type: String, required: true }, // Type du widget (weather ou crypto)
  config: { type: Object, required: true }, // Configuration spécifique au type
  position: {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
  },
});
