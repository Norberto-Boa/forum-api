import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { right, type Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import type { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationServiceRequest {
  recipientId: string;
  title: string;
  content: string;
}

type SendNotificationServiceResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationService {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationServiceRequest): Promise<SendNotificationServiceResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationRepository.create(notification);

    return right({ notification });
  }
}
