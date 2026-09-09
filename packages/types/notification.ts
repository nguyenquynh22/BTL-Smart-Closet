export type NotificationType = 'stylingReminder' | 'appUpdate';

export interface Notification {
  id: number;
  userId: number;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
}