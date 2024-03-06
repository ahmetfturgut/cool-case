import { Injectable } from '@nestjs/common';
import { GetEventsRequestDto } from './dto/events.request.dto';
import { GetEventsResponseDto } from './dto/events.response.dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
    constructor(private readonly eventsRepository: EventsRepository) { }

    getEvents(query: GetEventsRequestDto): GetEventsResponseDto {
        const { page, limit } = query;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const events = this.eventsRepository.getEvents(startIndex, endIndex);

        let response = new GetEventsResponseDto();
        response.data = events;
        response.page = page;
        response.limit = limit;
        response.total = events.length;
        return response;
    }
}
