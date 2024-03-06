import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventsRepository: { getEvents: any; };

  beforeEach(async () => {
    mockEventsRepository = {
      getEvents: jest.fn().mockImplementation((start, end) => Array(end - start).fill({})),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventsRepository, useValue: mockEventsRepository },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return events data', async () => {
      const query = { page: 1, limit: 5 };
      const result = service.getEvents(query);
      
      expect(mockEventsRepository.getEvents).toHaveBeenCalledWith(0, 5);
      expect(result.data.length).toBe(5);
      expect(result.page).toBe(query.page);
      expect(result.limit).toBe(query.limit);
      expect(result.total).toBe(5);
    });
  });
});