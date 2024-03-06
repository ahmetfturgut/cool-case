import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let mockEventsService: { getEvents: any; };

  beforeEach(async () => {
    mockEventsService = {
      getEvents: jest.fn().mockImplementation((query) => ({
        data: Array(query.limit).fill({}),
        page: query.page,
        limit: query.limit,
        total: query.limit,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: mockEventsService }],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getWelcome', () => {
    it('should return welcome message', () => {
      expect(controller.getWelcome()).toBe('Welcome to the event-api!');
    });
  });

  describe('getEvents', () => {
    it('should return events data', () => {
      const query = { page: 1, limit: 5 };
      const result = controller.getEvents(query);
      
      expect(mockEventsService.getEvents).toHaveBeenCalledWith(query);
      expect(result.data.length).toBe(5);
      expect(result.page).toBe(query.page);
      expect(result.limit).toBe(query.limit);
      expect(result.total).toBe(5);
    });
  });
});
