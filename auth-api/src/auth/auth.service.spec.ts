import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    // JwtService için mockto oluşturuldu
    const jwtServiceMock = {
      sign: jest.fn().mockImplementation((payload) => `mockedToken_${payload.email}`),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // JwtService'i jwtServiceMock ile sağlandı
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createToken', () => {
    it('should create a token', async () => {
      const email = 'test@example.com';
      const token = await authService.createToken(email);

      expect(token).toBeDefined();
      expect(token).toBe(`mockedToken_${email}`);
      // Ayrıca JwtService'nin sign metodu çapırıldı
      expect(jwtService.sign).toHaveBeenCalledWith({ email });
    });
  });
});
