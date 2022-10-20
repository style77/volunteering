# Volunteering
![CodeFactor](https://www.codefactor.io/repository/github/style77/volunteering/badge) ![ChecksStatus](https://img.shields.io/github/checks-status/style77/volunteering/main) ![Vercel](https://vercelbadge.vercel.app/api/style77/volunteering)

Strona stworzona na konkurs [Hack Heroes](https://hackheroes.pl/) organizowany przez Fundacje Media 3.0 i SAP SE z partnerami - firmą HP Inc. i programem Nowa Akademia.

Główną ideą strony jest promocja wolontariatu wśród młodych ludzi. Strona ma na celu ułatwienie znalezienia wolontariatu dla osób, które chcą się zaangażować w działania społeczne. Strona ma również na celu promocję wolontariatu wśród firm, które chcą wspierać społeczność. Konkretnym celem są młodzi ludzie, którzy chcą się zaangażować w działania społeczne, ale nie wiedzą jak i gdzie. 
Nasza aplikacja po każdym wolontariacie dodaje statystyki do profilu - przy określonej ilości punktów, do profilu wolontariusza jest dodawana odznaka. Odznaki są widoczne na profilu użytkownika. 

Strona jest dostępna na https://volunteering.pl/

## Zastrzeżenia

Volunteering nie potrzebuje API - wszystko działa w oparciu o Firebase, a więc nie ma żadnych dodatkowych kosztów (do czasu, aż nie osiągniemy [limitów](https://cloud.google.com/firestore/quotas) 😁).

Problematyczne może być logowanie się użytkownika, który zweryfikował swoje konto numerem telefonu - wtedy musi on zawsze logować się przy pomocy weryfikacji dwuetapowej, gdzie mamy wrażenie, że aplikacja nie wymaga, aż takich zabezpieczeń.
Niestety nie jest to możliwe do zrobienia inaczej przy użyciu firebase, w Volunteering weryfikacja działa na zasadzie właczenia weryfikacji dwuetapowej (MFA) z numerem telefonu, a przy okazji użytkownik jest zmieniany na zweryfikowanego.
Alternatywą do tego rozwiązania mogłoby być użycie Twillio/verify, aczkolwiek to też nie jest idealne rozwiązanie, gdyż wymagałoby to dodatkowych kosztów.

## Przyszłość

Mamy mnóstwo pomysłow na kolejne funkcjonalności strony, ale ze względu na ograniczony czas, nie jesteśmy w stanie wszystkich dodać - aczkolwiek dołożyliśmy wszelkich starań, aby strona była jak najlepsza i miała jak najwięcej funkcji urozmaicających jej działanie!

W przyszłości można by dodać np.:
- możliwość zbierania punktów za każdy wolontariat (np. 1 punkt za każdą godzinę wolontariatu)
- możliwość wymiany punktów na nagrody
- możliwość zdobywania poziomów

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
- [Luxon](https://moment.github.io/luxon/)

##### LINT
- [Yarn](https://yarnpkg.com/)
- [Travis CI](https://travis-ci.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## System odznak

Po wolontariacie, organizator może zaznaczyć w panelu dla [organizatorów](https://volunteering.pl/dashboard), że wolontariusz wziął udział w wolontariacie. Wolontariusze przez branie udziału w różnorakich wolontariatach zdobywają odznaki, które są widoczne na stronie [organizatorów](https://volunteering.pl/profile).

**Lista odznak:**

**Dla wolontariuszy**

<details>
<summary>"Pierwszy krok"</summary> 
- za pierwszy udział w wolontariacie
</details>
<details>
<summary>"Wolontariusz"</summary>
- za udział w 5 wolontariatach
</details>
<details>
<summary>"Wolontariusz doświadczony"</summary>
- za udział w 10 wolontariatach
</details>
<details>
<summary>"Wolontariusz profesjonalny"</summary>
- za udział w 20 wolontariatach
</details>
<details>
<summary>"Wolontariusz ekspert"</summary>
- za udział w 50 wolontariatach
</details>
<details>
<summary>"Wolontariusz mistrz"</summary>
- za udział w 100 wolontariatach
</details>

**Dla organizatorów**

<details>
<summary>"Organizator"</summary>
- za utworzenie pierwszego wolontariatu
</details>
<details>
<summary>"Organizator doświadczony"</summary>
- za utworzenie 5 wolontariatów
</details>

## Autorzy

- [Joachim Hodana](https://github.com/Style77)
- [Bartek Kluska](https://github.com/kluczi)

## Licencja

[MIT](https://choosealicense.com/licenses/mit/)