


# Cool-Case Project

`auth-api` , `events-api` 

### Kurulum 

```bash
docker-compose up --build
```


## Kullanım

API'leri test etmek için aşağıdaki endpoint'lere HTTP istekleri gönderebilirsiniz:

- `auth-api`:
  - `POST /auth-api/login`: Kullanıcı girişi için kullanılır. Payload olarak `email = "test@example.com"` ve `password = "correctpassword"` bekler.
  

- `events-api`:
  - `GET /events-api/welcome`: Hoşgeldiniz mesajını döner.
  - `GET /events-api/events?page=1&limit=10`: Etkinlik listesini döner.

 
Postman koleksiyonunu postman dizini altında paylaştım import yapıp kullanılabilir.


## Testler

`auth-api` ve `events-api` servislerindeki testleri çalıştırmak için aşağıdaki komutları kullanabilirsiniz:

```bash
# auth-api testlerini çalıştırmak için
cd auth-api && npm run test

# events-api testlerini çalıştırmak için
cd events-api && npm run test

  
