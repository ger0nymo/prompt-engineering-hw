## Feladat
A projekt célja egy olyan webes API létrehozása volt, amely segítségével – saját projekten keresztül – tanárok kvízkérdéseket tudnak generálni a diákjaik számára.

Az API létrehozásához NestJS keretrendszert használtam.

Az API a háttérben a Gemini Pro modellt promptolja. 

A szerver támogatja a hitelesítés (regisztráció, bejelentkezés) funkciókat, illetve magát a kérdés generálását.

A kérdések generálása csak érvényes JWT token mellett lehetséges, amelyet a felhasználó bejelentkezéskor kap meg.

A felhasznált promptok a ```question.service.ts``` fájlban elérhetőek.

A projekt futtatásához szükség van a következő környezeti változók definiálására a .env fájlban:

- JWT_SECRET=<jwt_secret>
- MONGODB_PASSWORD=<mongodb_password>
- API_KEY=<gemini_api_key>

Mivel a Gemini API támogatott régiói között nincs ott Magyarország, ezért a projekt futtatásához VPN szükséges. 

([támogatott régiók](https://ai.google.dev/gemini-api/docs/available-regions))

