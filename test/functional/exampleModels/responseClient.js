response = {
  clientEmpty: {
    'spouse': null,
    'surname': null,
    'name': null,
    'patronymic': null,
    'nameChange': null,
    'dob': null,
    'birthCountry': null,
    'citizenship': null,
    'snils': null,
    'tin': null,
    'status': null,
    'typeEducation': null,
    'maritalStatus': null,
    'generalExp': null,
    'curWorkExp': null,
    'curFieldExp': null,
    'typeEmp': null,
    'monIncome': null,
    'monExpenses': null,
    'files': null,
    'documents': null,
    'communications': null
  },
  ClientWithSpouse: {
    'spouse': {
      'regAddress': null,
      'livingAddress': null,
      'passport': null,
      'children': [],
      'jobs': [],
      'surname': null,
      'name': null,
      'patronymic': null,
      'nameChange': null,
      'dob': null,
      'birthCountry': null,
      'citizenship': null,
      'snils': null,
      'tin': null,
      'status': null,
      'typeEducation': null,
      'maritalStatus': null,
      'generalExp': null,
      'curWorkExp': null,
      'curFieldExp': null,
      'typeEmp': null,
      'monIncome': null,
      'monExpenses': null,
      'files': null,
      'documents': null,
      'communications': null
    }
  },
  ClientWrongValidate: {
    'code': 400,
    'key': 'E_VALIDATION_FAILED',
    'message': [
      {
        'message': 'status validation failed on status',
        'field': 'status',
        'validation': 'status'
      }
    ]
  },
  ClientWithAddress: {
    'regAddress': {
      'country': null,
      'zipCode': '454084',
      'region': 'Саратовская область',
      'city': 'Саратов',
      'street': 'ул. Пушкина',
      'house': '12',
      'block': 'A',
      'apartment': '101a'
    }
  },
  ClientWithJobs: {
    'jobs': [
      {
        'address': {
          'country': null,
          'zipCode': '454084',
          'region': 'Саратовская область',
          'city': 'Саратов',
          'street': 'ул. Пушкина',
          'house': '12',
          'block': 'A',
          'apartment': '101a'
        },
        'dateEmp': null,
        'dateDismissal': null,
        'companyName': 'companyName',
        'tin': 'tin',
        'type': 'main',
        'jobTitle': 'jobTitle',
        'monIncome': '0',
        'fioManager': 'fioManager',
        'site': 'http://example.com/aeiou'
      }
    ]
  },
  ClientFull:{
    "regAddress": {
      "country": null,
      "zipCode": "454084",
      "region": "Саратовская область",
      "city": "Саратов",
      "street": "ул. Пушкина",
      "house": "12",
      "block": "A",
      "apartment": "101a"
    },
    "livingAddress": {
      "country": null,
      "zipCode": "454084",
      "region": "Саратовская область",
      "city": "Саратов",
      "street": "ул. Пушкина",
      "house": "12",
      "block": "A",
      "apartment": "101a"
    },
    "passport": {
      "series": "7474",
      "number": "12232",
      "giver": "ОУФМ Челябинской обл. по Центральному р-ну гор.Челябинска",
      "dateIssued": null,
      "birthPlace": "birthPlace"
    },
    "children": [
      {
        "surname": "Пупкин",
        "name": "Вася",
        "patronymic": "adsf",
        "dob": null
      },
      {
        "surname": "Пупкин",
        "name": "Вася",
        "patronymic": "Михайлович",
        "dob": null
      }
    ],
    "jobs": [
      {
        "address": {
          "country": null,
          "zipCode": null,
          "region": null,
          "city": null,
          "street": null,
          "house": null,
          "block": null,
          "apartment": null
        },
        "dateEmp": null,
        "dateDismissal": null,
        "companyName": "companyName",
        "tin": "tin",
        "type": "main",
        "jobTitle": "jobTitle",
        "monIncome": "0",
        "fioManager": "fioManager",
        "site": "http://example.com/aeiou"
      },
      {
        "address": {
          "country": null,
          "zipCode": "454084",
          "region": "Саратовская область",
          "city": "Саратов",
          "street": "ул. Пушкина",
          "house": "12",
          "block": "A",
          "apartment": "101a"
        },
        "dateEmp": null,
        "dateDismissal": null,
        "companyName": "companyName",
        "tin": "tin",
        "type": "main",
        "jobTitle": "jobTitle",
        "monIncome": "0",
        "fioManager": "fioManager",
        "site": "http://example.com/aeiou"
      }
    ],
    "spouse": {
      "regAddress": {
        "country": null,
        "zipCode": "454084",
        "region": "Саратовская область",
        "city": "Саратов",
        "street": "ул. Пушкина",
        "house": "12",
        "block": "A",
        "apartment": "101a"
      },
      "livingAddress": {
        "country": null,
        "zipCode": "454084",
        "region": "Саратовская область",
        "city": "Саратов",
        "street": "ул. Пушкина",
        "house": "12",
        "block": "A",
        "apartment": "101a"
      },
      "passport": {
        "series": "7474",
        "number": "12232",
        "giver": "ОУФМ Челябинской обл. по Центральному р-ну гор.Челябинска",
        "dateIssued": null,
        "birthPlace": "birthPlace"
      },
      "children": [
        {
          "surname": "Пупкин",
          "name": "Вася",
          "patronymic": "adsf",
          "dob": null
        },
        {
          "surname": "Пупкин",
          "name": "Вася",
          "patronymic": "Михайлович",
          "dob": null
        }
      ],
      "jobs": [
        {
          "address": {
            "country": null,
            "zipCode": null,
            "region": null,
            "city": null,
            "street": null,
            "house": null,
            "block": null,
            "apartment": null
          },
          "dateEmp": null,
          "dateDismissal": null,
          "companyName": "companyName",
          "tin": "tin",
          "type": "main",
          "jobTitle": "jobTitle",
          "monIncome": "0",
          "fioManager": "fioManager",
          "site": "http://example.com/aeiou"
        },
        {
          "address": {
            "country": null,
            "zipCode": "454084",
            "region": "Саратовская область",
            "city": "Саратов",
            "street": "ул. Пушкина",
            "house": "12",
            "block": "A",
            "apartment": "101a"
          },
          "dateEmp": null,
          "dateDismissal": null,
          "companyName": "companyName",
          "tin": "tin",
          "type": "main",
          "jobTitle": "jobTitle",
          "monIncome": "0",
          "fioManager": "fioManager",
          "site": "http://example.com/aeiou"
        }
      ],
      "surname": "Ленин",
      "name": "Владимир",
      "patronymic": "patronymic",
      "nameChange": true,
      "dob": null,
      "birthCountry": null,
      "citizenship": null,
      "snils": null,
      "tin": null,
      "status": "lead",
      "typeEducation": "secondary",
      "maritalStatus": "single",
      "generalExp": 17,
      "curWorkExp": 1.4658129,
      "curFieldExp": 52342,
      "typeEmp": "employee",
      "monIncome": "5434352",
      "monExpenses": "2234",
      "files": [
        "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      ],
      "documents": [
        "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
        "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
      ],
      "communications": null
    },
    "surname": "sfewasd",
    "name": "name",
    "patronymic": "patronymic",
    "nameChange": true,
    "dob": null,
    "birthCountry": null,
    "citizenship": null,
    "snils": null,
    "tin": null,
    "status": "lead",
    "typeEducation": "secondary",
    "maritalStatus": "single",
    "generalExp": 17,
    "curWorkExp": 1.4658129,
    "curFieldExp": 52342,
    "typeEmp": "employee",
    "monIncome": "5434352",
    "monExpenses": "2234",
    "files": [
      "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    ],
    "documents": [
      "046b6c7f-0b8a-43b9-b35d-6489e6daee91",
      "046b6c7f-0b8a-43b9-b35d-6489e6daee91"
    ],
    "communications": null
  }
}
module.exports = response
