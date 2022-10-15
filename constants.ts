const humanizeError: any = {
  "auth/invalid-email": "Niepoprawny adres email",
  "auth/user-disabled": "Konto zostało zablokowane",
  "auth/user-not-found": "Nie znaleziono użytkownika",
  "auth/wrong-password": "Niepoprawne hasło",
  "auth/email-already-in-use": "Ten adres email jest już używany",
  "auth/weak-password": "Hasło jest zbyt słabe",
  "auth/operation-not-allowed": "Operacja niedozwolona",
  "auth/too-many-requests":
    "Zbyt wiele prób logowania. Spróbuj ponownie później",
  "auth/missing-email": "Nie znaleziono konta z podanym adresem email",
  "auth/popup-closed-by-user": "Okno logowania zostało zamknięte",
  "auth/account-exists-with-different-credential":
    "Konto z podanym adresem email już istnieje",
  "auth/credential-already-in-use":
    "Konto z podanym adresem email już istnieje",
  "auth/invalid-credential": "Niepoprawne dane logowania",
  "auth/invalid-verification-code": "Niepoprawny kod weryfikacyjny",
  "auth/invalid-verification-id": "Niepoprawny kod weryfikacyjny",
  "auth/missing-verification-code": "Niepoprawny kod weryfikacyjny",
  "auth/missing-verification-id": "Niepoprawny kod weryfikacyjny",
  "auth/phone-number-already-exists":
    "Konto z podanym numerem telefonu już istnieje",
  "auth/invalid-phone-number": "Niepoprawny numer telefonu",
  "auth/missing-phone-number": "Niepoprawny numer telefonu",
  "auth/quota-exceeded": "Zbyt wiele prób logowania. Spróbuj ponownie później",
  "auth/captcha-check-failed": "Nie udało się zweryfikować reCAPTCHA",
  "auth/invalid-app-credential": "Niepoprawne dane logowania",
  "auth/invalid-app-id": "Niepoprawne dane logowania",
};

// TODO: change types from any to Map/Array (im getting some errors and its 12:20 am so im not gonna fix it rn)


const volunteeringTypes: any = {
  "hospice": "Hospicyjny",
  "sport":"Sportowy",
  "ngo": "NGO",
  "elderly": "Pomoc seniorom",
  "animals": "Schronisko",

} 

const volunteeringTypesArray = [
  { value: "hospice", label: "Hospicyjny" },
  { value: "sport", label: "Sportowy" },
  { value: "ngo", label: "NGO" },
  { value: "elderly", label: "Pomoc seniorom" },
  { value: "animals", label: "Schronisko" },
]

const volunteeringPaidTypes = {
  "paid": "Płatna",
  "unpaid": "Bezpłatna",
}

const volunteeringPaidToBoolean: any = {
  "paid": true,
  "unpaid": false,
}

const volunteeringTerms: any = {
  "one-time": "Jednorazowy",
  "periodic": "Okresowy",
};

export {
  humanizeError,
  volunteeringTypes,
  volunteeringTypesArray,
  volunteeringPaidTypes,
  volunteeringPaidToBoolean,
  volunteeringTerms,
};