import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../../core/decorators/public.decorator';
import { EventsService } from './events.service';
import { GetEventsRequestDto } from './dto/events.request.dto';
import { GetEventsResponseDto } from './dto/events.response.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Public()
    @Get('welcome')
    getWelcome(): string {
        return 'Welcome to the event-api!';
    }
 
    @Get("getEvents")
    getEvents(@Query() query: GetEventsRequestDto): GetEventsResponseDto {
        return this.eventsService.getEvents(query);
    }
}
