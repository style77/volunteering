# Volunteering
[![Build Status](https://travis-ci.org/style77/volunteering.svg?branch=main)](https://travis-ci.org/style77/volunteering)
<!-- <div style="display: flex; gap: 12px; height:48px; margin-bottom: 20px">
<a href="https://freetools.seobility.net/en/seocheck/volunteering.pl"><img src="https://freetools.seobility.net/widget/widget.png?url=volunteering.pl" alt="Seobility Score für volunteering.pl"></a>
</div> -->

Strona napisana na konkurs [Hack Heroes](https://hackheroes.pl/) organizowany przez Fundacje Media 3.0 i SAP SE z partnerami - firmą HP Inc. i programem Nowa Akademia.
Zamysłem strony jest ułatwienie znajdywania wolonatriuszy dla wolontariatów i vice versa. Jest to coś nowego - nie ma takiej strony w Polsce, oprócz stron rządowych, które i tak nie są konkretnie skupione na wolontariach, a obok ogłoszeń takowych są też np. ogłoszenia pracy, nasza strona jest skierowana stricte do wolontariuszy i wolontariatów.

Strona jest dostępna na https://volunteering.pl/

## Zastrzeżenia

Mamy mnóstwo pomysłow na kolejne funkcjonalności strony, ale ze względu na ograniczony czas, nie jesteśmy w stanie wszystkich dodać - aczkolwiek dołożyliśmy wszelkich starań, aby strona była jak najlepsza i miała jak najwięcej funkcji urozmaicających jej działanie!

Volunteering nie potrzebuje API - wszystko działa w oparciu o Firebase, a więc nie ma żadnych dodatkowych kosztów (do czasu, aż nie osiągniemy [limitów](https://cloud.google.com/firestore/quotas) 😁).

Problematyczne może być logowanie się użytkownika, który zweryfikował swoje konto numerem telefonu - wtedy musi on zawsze logować się przy pomocy weryfikacji dwuetapowej, gdzie mamy wrażenie, że aplikacja nie wymaga, aż takich zabezpieczeń.
Niestety nie jest to możliwe do zrobienia inaczej przy użyciu firebase, w Volunteering weryfikacja działa na zasadzie właczenia weryfikacji dwuetapowej z numerem telefonu, a przy okazji użytkownik jest zmieniany na zweryfikowanego.
Alternatywą do tego rozwiązania mogłoby być użycie Twillio/verify, aczkolwiek to też nie jest idealne rozwiązanie, ponieważ wymagałoby to dodatkowych kosztów.

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

## Autorzy

- [Joachim Hodana](https://github.com/Style77)
- [Bartek Kluska](https://github.com/kluczi)

## System odznak

Po wolontariacie, organizator może zaznaczyć na stronie, że wolontariusz wziął udział w wolontariacie. Wolontariusze przez branie udziału w różnorakich wolontariatach zdobywają odznaki, które są widoczne na stronie profilu wolontariusza.

**Lista odznak:**

**Dla wolontariuszy**

<details>
<summary>"Pierwszy krok"</summary> 
- za pierwszy udział w wolontariacie (ID: 1001)
</details>
<details>
<summary>"Wolontariusz"</summary>
- za udział w 5 wolontariatach (ID: 1005)
</details>
<details>
<summary>"Wolontariusz doświadczony"</summary>
- za udział w 10 wolontariatach (ID: 1010)
</details>
<details>
<summary>"Wolontariusz profesjonalny"</summary>
- za udział w 20 wolontariatach (ID: 1020)
</details>
<details>
<summary>"Wolontariusz ekspert"</summary>
- za udział w 50 wolontariatach (ID: 1050)
</details>
<details>
<summary>"Wolontariusz mistrz"</summary>
- za udział w 100 wolontariatach (ID: 1110)
</details>

**Dla organizatorów**

<details>
<summary>"Organizator"</summary>
- za utworzenie pierwszego wolontariatu (ID: 2001)
</details>
<details>
<summary>"Organizator doświadczony"</summary>
- za utworzenie 5 wolontariatów (ID: 2005)
</details>

