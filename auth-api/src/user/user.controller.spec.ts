// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { LoginRequestDto } from './dto/user.request.dto';

describe('UserController', () => {
  let userController: UserController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        AuthService,
        UserService,
        {
          provide: AuthService,
          useValue: { createToken: jest.fn().mockResolvedValue('mockedToken') },
        },
        {
          provide: UserService,
          useValue: { checkUser: jest.fn().mockResolvedValue(true) },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('login', () => {
    it('should return a login response with access token for valid', async () => {
      jest.spyOn(userService, 'checkUser').mockResolvedValueOnce(true);

      const requestDto = new LoginRequestDto();
      requestDto.email = 'test@example.com';
      requestDto.password = 'correctpassword';

      const response = await userController.login(requestDto);

      expect(response.accessToken).toBeDefined();
      expect(userService.checkUser).toHaveBeenCalledWith('test@example.com', 'correctpassword');
      expect(authService.createToken).toHaveBeenCalledWith('test@example.com');
    });

    it('should throw an error if user validation fails', async () => {
      const requestDto = new LoginRequestDto();
      requestDto.email = 'wrong@example.com';
      requestDto.password = 'wrongpassword'; 
   
      jest.spyOn(userService, 'checkUser').mockResolvedValueOnce(false);

      await expect(userController.login(requestDto)).rejects.toThrow('Unauthorized');
    });
  });

});
