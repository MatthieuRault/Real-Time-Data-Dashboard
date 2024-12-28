import { Document, model, Schema } from 'mongoose';

export interface Dashboard extends Document {
  name: string;
  code: string;
}

export const DashboardSchema = new Schema<Dashboard>({
  name: { type: String, required: true }, // Nom du dashboard
  code: { type: String, required: true, unique: true }, // Code du dashboard
});

export const DashboardModel = model<Dashboard>('Dashboard', DashboardSchema);
