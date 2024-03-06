import { EventModel } from "../events.model";

export class GetEventsResponseDto {
    data: EventModel[];
    page: number;
    limit: number;
    total: number;
  }