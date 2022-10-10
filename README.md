# Volunteering
Strona napisana na konkurs [Hack Heroes](https://hackheroes.pl/) organizowany przez Fundacje Media 3.0 i SAP SE z partnerami - firmą HP Inc. i programem Nowa Akademia.
Zamysłem strony jest ułatwienie znajdywania wolonatriuszy dla wolontariatów i vice versa. Jest to coś nowego - nie ma takiej strony w Polsce, oprócz stron rządowych, które i tak nie są konkretnie skupione na wolontariach, a obok ogłoszeń takowych są też np. ogłoszenia pracy, nasza strona jest skierowana stricte do wolontariuszy i wolontariatów.

Strona jest dostępna na https://volunteering.pl/

## Instalacja
Aby uruchomić stronę lokalnie (używając yarna) należy:
1. Pobrać repozytorium `git clone https://github.com/Style77/volunteering.git`
2. Zainstalować wszystkie moduły `yarn install`
3. Stworzyć plik `.env.local` i wkleić do niego:
```env
# Firebase
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=

# Email.js
emailJsServiceId=
emailJsTemplateId=
emailJsPublicKey=
```
4. Uruchomić stronę `yarn dev`

## Technologie
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Email.js](https://www.emailjs.com/)
- [Vivid Studio](https://vivid.lol/)

## Autorzy
- [Joachim Hodana](https://github.com/Style77)
- [Bartek Kluska](https://github.com/kluczi)