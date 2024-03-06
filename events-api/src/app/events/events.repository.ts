import { Injectable } from '@nestjs/common';
import { GetEventsRequestDto } from './dto/events.request.dto';
import { EventModel } from './events.model';

@Injectable()
export class EventsRepository {


    private readonly events = Array(50)
        .fill({})
        .map((_, i) => ({ id: (i + 1), name: `User ${(i + 1)}`, event: `Event ${(i + 1)}` }));


    getEvents(startIndex: number, endIndex: number): EventModel[] {

        const events: EventModel[] = this.events.slice(startIndex, endIndex).map(event => ({
            id: event.id,
            name: event.name,
            event: event.event
        }));

        return events;
    }

}
