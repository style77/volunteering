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
};

// TODO: change types from any to Map/Array (im getting some errors and its 12:20 am so im not gonna fix it rn)


const volunteeringTypes: any = {
  "hospice": "Hospicjum",
  "home": "Pomoc domowa",
  "children": "Pomoc dzieciom",
  "elderly": "Pomoc starszym",
  "animals": "Pomoc zwierzętom",

} 

const volunteeringTypesArray = [
  { value: "hospice", label: "Hospicjum" },
  { value: "home", label: "Pomoc domowa" },
  { value: "children", label: "Pomoc dzieciom" },
  { value: "elderly", label: "Pomoc starszym" },
  { value: "animals", label: "Pomoc zwierzętom" },
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
  "one-time": "Jednorazowo",
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