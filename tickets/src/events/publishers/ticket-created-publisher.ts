import { Publisher, Subjects, TicketCreatedEvent } from '@johnny711/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
