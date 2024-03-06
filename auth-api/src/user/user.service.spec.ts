import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
   });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return true', async () => {
       const email = 'test@example.com';
      const password = 'correctpassword';
      expect(await service.checkUser(email, password)).toBe(true);
    });

     it('should return false', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';
      expect(await service.checkUser(email, password)).toBe(false);
    });
  });
});