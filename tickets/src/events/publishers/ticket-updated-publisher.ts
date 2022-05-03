import { Publisher, Subjects, TicketUpdatedEvent } from '@johnny711/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
