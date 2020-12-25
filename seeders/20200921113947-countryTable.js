'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('countries', [
        {
          "id" : 1,
          "sortname" : "AF",
          "countryName" : "Afghanistan",
          "phonecode" : 93
        },
        {
          "id" : 2,
          "sortname" : "AL",
          "countryName" : "Albania",
          "phonecode" : 355
        },
        {
          "id" : 3,
          "sortname" : "DZ",
          "countryName" : "Algeria",
          "phonecode" : 213
        },
        {
          "id" : 4,
          "sortname" : "AS",
          "countryName" : "American Samoa",
          "phonecode" : 1684
        },
        {
          "id" : 5,
          "sortname" : "AD",
          "countryName" : "Andorra",
          "phonecode" : 376
        },
        {
          "id" : 6,
          "sortname" : "AO",
          "countryName" : "Angola",
          "phonecode" : 244
        },
        {
          "id" : 7,
          "sortname" : "AI",
          "countryName" : "Anguilla",
          "phonecode" : 1264
        },
        {
          "id" : 8,
          "sortname" : "AQ",
          "countryName" : "Antarctica",
          "phonecode" : 0
        },
        {
          "id" : 9,
          "sortname" : "AG",
          "countryName" : "Antigua And Barbuda",
          "phonecode" : 1268
        },
        {
          "id" : 10,
          "sortname" : "AR",
          "countryName" : "Argentina",
          "phonecode" : 54
        },
        {
          "id" : 11,
          "sortname" : "AM",
          "countryName" : "Armenia",
          "phonecode" : 374
        },
        {
          "id" : 12,
          "sortname" : "AW",
          "countryName" : "Aruba",
          "phonecode" : 297
        },
        {
          "id" : 13,
          "sortname" : "AU",
          "countryName" : "Australia",
          "phonecode" : 61
        },
        {
          "id" : 14,
          "sortname" : "AT",
          "countryName" : "Austria",
          "phonecode" : 43
        },
        {
          "id" : 15,
          "sortname" : "AZ",
          "countryName" : "Azerbaijan",
          "phonecode" : 994
        },
        {
          "id" : 16,
          "sortname" : "BS",
          "countryName" : "Bahamas The",
          "phonecode" : 1242
        },
        {
          "id" : 17,
          "sortname" : "BH",
          "countryName" : "Bahrain",
          "phonecode" : 973
        },
        {
          "id" : 18,
          "sortname" : "BD",
          "countryName" : "Bangladesh",
          "phonecode" : 880
        },
        {
          "id" : 19,
          "sortname" : "BB",
          "countryName" : "Barbados",
          "phonecode" : 1246
        },
        {
          "id" : 20,
          "sortname" : "BY",
          "countryName" : "Belarus",
          "phonecode" : 375
        },
        {
          "id" : 21,
          "sortname" : "BE",
          "countryName" : "Belgium",
          "phonecode" : 32
        },
        {
          "id" : 22,
          "sortname" : "BZ",
          "countryName" : "Belize",
          "phonecode" : 501
        },
        {
          "id" : 23,
          "sortname" : "BJ",
          "countryName" : "Benin",
          "phonecode" : 229
        },
        {
          "id" : 24,
          "sortname" : "BM",
          "countryName" : "Bermuda",
          "phonecode" : 1441
        },
        {
          "id" : 25,
          "sortname" : "BT",
          "countryName" : "Bhutan",
          "phonecode" : 975
        },
        {
          "id" : 26,
          "sortname" : "BO",
          "countryName" : "Bolivia",
          "phonecode" : 591
        },
        {
          "id" : 27,
          "sortname" : "BA",
          "countryName" : "Bosnia and Herzegovina",
          "phonecode" : 387
        },
        {
          "id" : 28,
          "sortname" : "BW",
          "countryName" : "Botswana",
          "phonecode" : 267
        },
        {
          "id" : 29,
          "sortname" : "BV",
          "countryName" : "Bouvet Island",
          "phonecode" : 0
        },
        {
          "id" : 30,
          "sortname" : "BR",
          "countryName" : "Brazil",
          "phonecode" : 55
        },
        {
          "id" : 31,
          "sortname" : "IO",
          "countryName" : "British Indian Ocean Territory",
          "phonecode" : 246
        },
        {
          "id" : 32,
          "sortname" : "BN",
          "countryName" : "Brunei",
          "phonecode" : 673
        },
        {
          "id" : 33,
          "sortname" : "BG",
          "countryName" : "Bulgaria",
          "phonecode" : 359
        },
        {
          "id" : 34,
          "sortname" : "BF",
          "countryName" : "Burkina Faso",
          "phonecode" : 226
        },
        {
          "id" : 35,
          "sortname" : "BI",
          "countryName" : "Burundi",
          "phonecode" : 257
        },
        {
          "id" : 36,
          "sortname" : "KH",
          "countryName" : "Cambodia",
          "phonecode" : 855
        },
        {
          "id" : 37,
          "sortname" : "CM",
          "countryName" : "Cameroon",
          "phonecode" : 237
        },
        {
          "id" : 38,
          "sortname" : "CA",
          "countryName" : "Canada",
          "phonecode" : 1
        },
        {
          "id" : 39,
          "sortname" : "CV",
          "countryName" : "Cape Verde",
          "phonecode" : 238
        },
        {
          "id" : 40,
          "sortname" : "KY",
          "countryName" : "Cayman Islands",
          "phonecode" : 1345
        },
        {
          "id" : 41,
          "sortname" : "CF",
          "countryName" : "Central African Republic",
          "phonecode" : 236
        },
        {
          "id" : 42,
          "sortname" : "TD",
          "countryName" : "Chad",
          "phonecode" : 235
        },
        {
          "id" : 43,
          "sortname" : "CL",
          "countryName" : "Chile",
          "phonecode" : 56
        },
        {
          "id" : 44,
          "sortname" : "CN",
          "countryName" : "China",
          "phonecode" : 86
        },
        {
          "id" : 45,
          "sortname" : "CX",
          "countryName" : "Christmas Island",
          "phonecode" : 61
        },
        {
          "id" : 46,
          "sortname" : "CC",
          "countryName" : "Cocos (Keeling) Islands",
          "phonecode" : 672
        },
        {
          "id" : 47,
          "sortname" : "CO",
          "countryName" : "Colombia",
          "phonecode" : 57
        },
        {
          "id" : 48,
          "sortname" : "KM",
          "countryName" : "Comoros",
          "phonecode" : 269
        },
        {
          "id" : 49,
          "sortname" : "CG",
          "countryName" : "Republic Of The Congo",
          "phonecode" : 242
        },
        {
          "id" : 50,
          "sortname" : "CD",
          "countryName" : "Democratic Republic Of The Congo",
          "phonecode" : 242
        },
        {
          "id" : 51,
          "sortname" : "CK",
          "countryName" : "Cook Islands",
          "phonecode" : 682
        },
        {
          "id" : 52,
          "sortname" : "CR",
          "countryName" : "Costa Rica",
          "phonecode" : 506
        },
        {
          "id" : 53,
          "sortname" : "CI",
          "countryName" : "Cote D'Ivoire (Ivory Coast)",
          "phonecode" : 225
        },
        {
          "id" : 54,
          "sortname" : "HR",
          "countryName" : "Croatia (Hrvatska)",
          "phonecode" : 385
        },
        {
          "id" : 55,
          "sortname" : "CU",
          "countryName" : "Cuba",
          "phonecode" : 53
        },
        {
          "id" : 56,
          "sortname" : "CY",
          "countryName" : "Cyprus",
          "phonecode" : 357
        },
        {
          "id" : 57,
          "sortname" : "CZ",
          "countryName" : "Czech Republic",
          "phonecode" : 420
        },
        {
          "id" : 58,
          "sortname" : "DK",
          "countryName" : "Denmark",
          "phonecode" : 45
        },
        {
          "id" : 59,
          "sortname" : "DJ",
          "countryName" : "Djibouti",
          "phonecode" : 253
        },
        {
          "id" : 60,
          "sortname" : "DM",
          "countryName" : "Dominica",
          "phonecode" : 1767
        },
        {
          "id" : 61,
          "sortname" : "DO",
          "countryName" : "Dominican Republic",
          "phonecode" : 1809
        },
        {
          "id" : 62,
          "sortname" : "TP",
          "countryName" : "East Timor",
          "phonecode" : 670
        },
        {
          "id" : 63,
          "sortname" : "EC",
          "countryName" : "Ecuador",
          "phonecode" : 593
        },
        {
          "id" : 64,
          "sortname" : "EG",
          "countryName" : "Egypt",
          "phonecode" : 20
        },
        {
          "id" : 65,
          "sortname" : "SV",
          "countryName" : "El Salvador",
          "phonecode" : 503
        },
        {
          "id" : 66,
          "sortname" : "GQ",
          "countryName" : "Equatorial Guinea",
          "phonecode" : 240
        },
        {
          "id" : 67,
          "sortname" : "ER",
          "countryName" : "Eritrea",
          "phonecode" : 291
        },
        {
          "id" : 68,
          "sortname" : "EE",
          "countryName" : "Estonia",
          "phonecode" : 372
        },
        {
          "id" : 69,
          "sortname" : "ET",
          "countryName" : "Ethiopia",
          "phonecode" : 251
        },
        {
          "id" : 70,
          "sortname" : "XA",
          "countryName" : "External Territories of Australia",
          "phonecode" : 61
        },
        {
          "id" : 71,
          "sortname" : "FK",
          "countryName" : "Falkland Islands",
          "phonecode" : 500
        },
        {
          "id" : 72,
          "sortname" : "FO",
          "countryName" : "Faroe Islands",
          "phonecode" : 298
        },
        {
          "id" : 73,
          "sortname" : "FJ",
          "countryName" : "Fiji Islands",
          "phonecode" : 679
        },
        {
          "id" : 74,
          "sortname" : "FI",
          "countryName" : "Finland",
          "phonecode" : 358
        },
        {
          "id" : 75,
          "sortname" : "FR",
          "countryName" : "France",
          "phonecode" : 33
        },
        {
          "id" : 76,
          "sortname" : "GF",
          "countryName" : "French Guiana",
          "phonecode" : 594
        },
        {
          "id" : 77,
          "sortname" : "PF",
          "countryName" : "French Polynesia",
          "phonecode" : 689
        },
        {
          "id" : 78,
          "sortname" : "TF",
          "countryName" : "French Southern Territories",
          "phonecode" : 0
        },
        {
          "id" : 79,
          "sortname" : "GA",
          "countryName" : "Gabon",
          "phonecode" : 241
        },
        {
          "id" : 80,
          "sortname" : "GM",
          "countryName" : "Gambia The",
          "phonecode" : 220
        },
        {
          "id" : 81,
          "sortname" : "GE",
          "countryName" : "Georgia",
          "phonecode" : 995
        },
        {
          "id" : 82,
          "sortname" : "DE",
          "countryName" : "Germany",
          "phonecode" : 49
        },
        {
          "id" : 83,
          "sortname" : "GH",
          "countryName" : "Ghana",
          "phonecode" : 233
        },
        {
          "id" : 84,
          "sortname" : "GI",
          "countryName" : "Gibraltar",
          "phonecode" : 350
        },
        {
          "id" : 85,
          "sortname" : "GR",
          "countryName" : "Greece",
          "phonecode" : 30
        },
        {
          "id" : 86,
          "sortname" : "GL",
          "countryName" : "Greenland",
          "phonecode" : 299
        },
        {
          "id" : 87,
          "sortname" : "GD",
          "countryName" : "Grenada",
          "phonecode" : 1473
        },
        {
          "id" : 88,
          "sortname" : "GP",
          "countryName" : "Guadeloupe",
          "phonecode" : 590
        },
        {
          "id" : 89,
          "sortname" : "GU",
          "countryName" : "Guam",
          "phonecode" : 1671
        },
        {
          "id" : 90,
          "sortname" : "GT",
          "countryName" : "Guatemala",
          "phonecode" : 502
        },
        {
          "id" : 91,
          "sortname" : "XU",
          "countryName" : "Guernsey and Alderney",
          "phonecode" : 44
        },
        {
          "id" : 92,
          "sortname" : "GN",
          "countryName" : "Guinea",
          "phonecode" : 224
        },
        {
          "id" : 93,
          "sortname" : "GW",
          "countryName" : "Guinea-Bissau",
          "phonecode" : 245
        },
        {
          "id" : 94,
          "sortname" : "GY",
          "countryName" : "Guyana",
          "phonecode" : 592
        },
        {
          "id" : 95,
          "sortname" : "HT",
          "countryName" : "Haiti",
          "phonecode" : 509
        },
        {
          "id" : 96,
          "sortname" : "HM",
          "countryName" : "Heard and McDonald Islands",
          "phonecode" : 0
        },
        {
          "id" : 97,
          "sortname" : "HN",
          "countryName" : "Honduras",
          "phonecode" : 504
        },
        {
          "id" : 98,
          "sortname" : "HK",
          "countryName" : "Hong Kong S.A.R.",
          "phonecode" : 852
        },
        {
          "id" : 99,
          "sortname" : "HU",
          "countryName" : "Hungary",
          "phonecode" : 36
        },
        {
          "id" : 100,
          "sortname" : "IS",
          "countryName" : "Iceland",
          "phonecode" : 354
        },
        {
          "id" : 101,
          "sortname" : "IN",
          "countryName" : "India",
          "phonecode" : 91
        },
        {
          "id" : 102,
          "sortname" : "ID",
          "countryName" : "Indonesia",
          "phonecode" : 62
        },
        {
          "id" : 103,
          "sortname" : "IR",
          "countryName" : "Iran",
          "phonecode" : 98
        },
        {
          "id" : 104,
          "sortname" : "IQ",
          "countryName" : "Iraq",
          "phonecode" : 964
        },
        {
          "id" : 105,
          "sortname" : "IE",
          "countryName" : "Ireland",
          "phonecode" : 353
        },
        {
          "id" : 106,
          "sortname" : "IL",
          "countryName" : "Israel",
          "phonecode" : 972
        },
        {
          "id" : 107,
          "sortname" : "IT",
          "countryName" : "Italy",
          "phonecode" : 39
        },
        {
          "id" : 108,
          "sortname" : "JM",
          "countryName" : "Jamaica",
          "phonecode" : 1876
        },
        {
          "id" : 109,
          "sortname" : "JP",
          "countryName" : "Japan",
          "phonecode" : 81
        },
        {
          "id" : 110,
          "sortname" : "XJ",
          "countryName" : "Jersey",
          "phonecode" : 44
        },
        {
          "id" : 111,
          "sortname" : "JO",
          "countryName" : "Jordan",
          "phonecode" : 962
        },
        {
          "id" : 112,
          "sortname" : "KZ",
          "countryName" : "Kazakhstan",
          "phonecode" : 7
        },
        {
          "id" : 113,
          "sortname" : "KE",
          "countryName" : "Kenya",
          "phonecode" : 254
        },
        {
          "id" : 114,
          "sortname" : "KI",
          "countryName" : "Kiribati",
          "phonecode" : 686
        },
        {
          "id" : 115,
          "sortname" : "KP",
          "countryName" : "Korea North",
          "phonecode" : 850
        },
        {
          "id" : 116,
          "sortname" : "KR",
          "countryName" : "Korea South",
          "phonecode" : 82
        },
        {
          "id" : 117,
          "sortname" : "KW",
          "countryName" : "Kuwait",
          "phonecode" : 965
        },
        {
          "id" : 118,
          "sortname" : "KG",
          "countryName" : "Kyrgyzstan",
          "phonecode" : 996
        },
        {
          "id" : 119,
          "sortname" : "LA",
          "countryName" : "Laos",
          "phonecode" : 856
        },
        {
          "id" : 120,
          "sortname" : "LV",
          "countryName" : "Latvia",
          "phonecode" : 371
        },
        {
          "id" : 121,
          "sortname" : "LB",
          "countryName" : "Lebanon",
          "phonecode" : 961
        },
        {
          "id" : 122,
          "sortname" : "LS",
          "countryName" : "Lesotho",
          "phonecode" : 266
        },
        {
          "id" : 123,
          "sortname" : "LR",
          "countryName" : "Liberia",
          "phonecode" : 231
        },
        {
          "id" : 124,
          "sortname" : "LY",
          "countryName" : "Libya",
          "phonecode" : 218
        },
        {
          "id" : 125,
          "sortname" : "LI",
          "countryName" : "Liechtenstein",
          "phonecode" : 423
        },
        {
          "id" : 126,
          "sortname" : "LT",
          "countryName" : "Lithuania",
          "phonecode" : 370
        },
        {
          "id" : 127,
          "sortname" : "LU",
          "countryName" : "Luxembourg",
          "phonecode" : 352
        },
        {
          "id" : 128,
          "sortname" : "MO",
          "countryName" : "Macau S.A.R.",
          "phonecode" : 853
        },
        {
          "id" : 129,
          "sortname" : "MK",
          "countryName" : "Macedonia",
          "phonecode" : 389
        },
        {
          "id" : 130,
          "sortname" : "MG",
          "countryName" : "Madagascar",
          "phonecode" : 261
        },
        {
          "id" : 131,
          "sortname" : "MW",
          "countryName" : "Malawi",
          "phonecode" : 265
        },
        {
          "id" : 132,
          "sortname" : "MY",
          "countryName" : "Malaysia",
          "phonecode" : 60
        },
        {
          "id" : 133,
          "sortname" : "MV",
          "countryName" : "Maldives",
          "phonecode" : 960
        },
        {
          "id" : 134,
          "sortname" : "ML",
          "countryName" : "Mali",
          "phonecode" : 223
        },
        {
          "id" : 135,
          "sortname" : "MT",
          "countryName" : "Malta",
          "phonecode" : 356
        },
        {
          "id" : 136,
          "sortname" : "XM",
          "countryName" : "Man (Isle of)",
          "phonecode" : 44
        },
        {
          "id" : 137,
          "sortname" : "MH",
          "countryName" : "Marshall Islands",
          "phonecode" : 692
        },
        {
          "id" : 138,
          "sortname" : "MQ",
          "countryName" : "Martinique",
          "phonecode" : 596
        },
        {
          "id" : 139,
          "sortname" : "MR",
          "countryName" : "Mauritania",
          "phonecode" : 222
        },
        {
          "id" : 140,
          "sortname" : "MU",
          "countryName" : "Mauritius",
          "phonecode" : 230
        },
        {
          "id" : 141,
          "sortname" : "YT",
          "countryName" : "Mayotte",
          "phonecode" : 269
        },
        {
          "id" : 142,
          "sortname" : "MX",
          "countryName" : "Mexico",
          "phonecode" : 52
        },
        {
          "id" : 143,
          "sortname" : "FM",
          "countryName" : "Micronesia",
          "phonecode" : 691
        },
        {
          "id" : 144,
          "sortname" : "MD",
          "countryName" : "Moldova",
          "phonecode" : 373
        },
        {
          "id" : 145,
          "sortname" : "MC",
          "countryName" : "Monaco",
          "phonecode" : 377
        },
        {
          "id" : 146,
          "sortname" : "MN",
          "countryName" : "Mongolia",
          "phonecode" : 976
        },
        {
          "id" : 147,
          "sortname" : "MS",
          "countryName" : "Montserrat",
          "phonecode" : 1664
        },
        {
          "id" : 148,
          "sortname" : "MA",
          "countryName" : "Morocco",
          "phonecode" : 212
        },
        {
          "id" : 149,
          "sortname" : "MZ",
          "countryName" : "Mozambique",
          "phonecode" : 258
        },
        {
          "id" : 150,
          "sortname" : "MM",
          "countryName" : "Myanmar",
          "phonecode" : 95
        },
        {
          "id" : 151,
          "sortname" : "NA",
          "countryName" : "Namibia",
          "phonecode" : 264
        },
        {
          "id" : 152,
          "sortname" : "NR",
          "countryName" : "Nauru",
          "phonecode" : 674
        },
        {
          "id" : 153,
          "sortname" : "NP",
          "countryName" : "Nepal",
          "phonecode" : 977
        },
        {
          "id" : 154,
          "sortname" : "AN",
          "countryName" : "Netherlands Antilles",
          "phonecode" : 599
        },
        {
          "id" : 155,
          "sortname" : "NL",
          "countryName" : "Netherlands The",
          "phonecode" : 31
        },
        {
          "id" : 156,
          "sortname" : "NC",
          "countryName" : "New Caledonia",
          "phonecode" : 687
        },
        {
          "id" : 157,
          "sortname" : "NZ",
          "countryName" : "New Zealand",
          "phonecode" : 64
        },
        {
          "id" : 158,
          "sortname" : "NI",
          "countryName" : "Nicaragua",
          "phonecode" : 505
        },
        {
          "id" : 159,
          "sortname" : "NE",
          "countryName" : "Niger",
          "phonecode" : 227
        },
        {
          "id" : 160,
          "sortname" : "NG",
          "countryName" : "Nigeria",
          "phonecode" : 234
        },
        {
          "id" : 161,
          "sortname" : "NU",
          "countryName" : "Niue",
          "phonecode" : 683
        },
        {
          "id" : 162,
          "sortname" : "NF",
          "countryName" : "Norfolk Island",
          "phonecode" : 672
        },
        {
          "id" : 163,
          "sortname" : "MP",
          "countryName" : "Northern Mariana Islands",
          "phonecode" : 1670
        },
        {
          "id" : 164,
          "sortname" : "NO",
          "countryName" : "Norway",
          "phonecode" : 47
        },
        {
          "id" : 165,
          "sortname" : "OM",
          "countryName" : "Oman",
          "phonecode" : 968
        },
        {
          "id" : 166,
          "sortname" : "PK",
          "countryName" : "Pakistan",
          "phonecode" : 92
        },
        {
          "id" : 167,
          "sortname" : "PW",
          "countryName" : "Palau",
          "phonecode" : 680
        },
        {
          "id" : 168,
          "sortname" : "PS",
          "countryName" : "Palestinian Territory Occupied",
          "phonecode" : 970
        },
        {
          "id" : 169,
          "sortname" : "PA",
          "countryName" : "Panama",
          "phonecode" : 507
        },
        {
          "id" : 170,
          "sortname" : "PG",
          "countryName" : "Papua new Guinea",
          "phonecode" : 675
        },
        {
          "id" : 171,
          "sortname" : "PY",
          "countryName" : "Paraguay",
          "phonecode" : 595
        },
        {
          "id" : 172,
          "sortname" : "PE",
          "countryName" : "Peru",
          "phonecode" : 51
        },
        {
          "id" : 173,
          "sortname" : "PH",
          "countryName" : "Philippines",
          "phonecode" : 63
        },
        {
          "id" : 174,
          "sortname" : "PN",
          "countryName" : "Pitcairn Island",
          "phonecode" : 0
        },
        {
          "id" : 175,
          "sortname" : "PL",
          "countryName" : "Poland",
          "phonecode" : 48
        },
        {
          "id" : 176,
          "sortname" : "PT",
          "countryName" : "Portugal",
          "phonecode" : 351
        },
        {
          "id" : 177,
          "sortname" : "PR",
          "countryName" : "Puerto Rico",
          "phonecode" : 1787
        },
        {
          "id" : 178,
          "sortname" : "QA",
          "countryName" : "Qatar",
          "phonecode" : 974
        },
        {
          "id" : 179,
          "sortname" : "RE",
          "countryName" : "Reunion",
          "phonecode" : 262
        },
        {
          "id" : 180,
          "sortname" : "RO",
          "countryName" : "Romania",
          "phonecode" : 40
        },
        {
          "id" : 181,
          "sortname" : "RU",
          "countryName" : "Russia",
          "phonecode" : 70
        },
        {
          "id" : 182,
          "sortname" : "RW",
          "countryName" : "Rwanda",
          "phonecode" : 250
        },
        {
          "id" : 183,
          "sortname" : "SH",
          "countryName" : "Saint Helena",
          "phonecode" : 290
        },
        {
          "id" : 184,
          "sortname" : "KN",
          "countryName" : "Saint Kitts And Nevis",
          "phonecode" : 1869
        },
        {
          "id" : 185,
          "sortname" : "LC",
          "countryName" : "Saint Lucia",
          "phonecode" : 1758
        },
        {
          "id" : 186,
          "sortname" : "PM",
          "countryName" : "Saint Pierre and Miquelon",
          "phonecode" : 508
        },
        {
          "id" : 187,
          "sortname" : "VC",
          "countryName" : "Saint Vincent And The Grenadines",
          "phonecode" : 1784
        },
        {
          "id" : 188,
          "sortname" : "WS",
          "countryName" : "Samoa",
          "phonecode" : 684
        },
        {
          "id" : 189,
          "sortname" : "SM",
          "countryName" : "San Marino",
          "phonecode" : 378
        },
        {
          "id" : 190,
          "sortname" : "ST",
          "countryName" : "Sao Tome and Principe",
          "phonecode" : 239
        },
        {
          "id" : 191,
          "sortname" : "SA",
          "countryName" : "Saudi Arabia",
          "phonecode" : 966
        },
        {
          "id" : 192,
          "sortname" : "SN",
          "countryName" : "Senegal",
          "phonecode" : 221
        },
        {
          "id" : 193,
          "sortname" : "RS",
          "countryName" : "Serbia",
          "phonecode" : 381
        },
        {
          "id" : 194,
          "sortname" : "SC",
          "countryName" : "Seychelles",
          "phonecode" : 248
        },
        {
          "id" : 195,
          "sortname" : "SL",
          "countryName" : "Sierra Leone",
          "phonecode" : 232
        },
        {
          "id" : 196,
          "sortname" : "SG",
          "countryName" : "Singapore",
          "phonecode" : 65
        },
        {
          "id" : 197,
          "sortname" : "SK",
          "countryName" : "Slovakia",
          "phonecode" : 421
        },
        {
          "id" : 198,
          "sortname" : "SI",
          "countryName" : "Slovenia",
          "phonecode" : 386
        },
        {
          "id" : 199,
          "sortname" : "XG",
          "countryName" : "Smaller Territories of the UK",
          "phonecode" : 44
        },
        {
          "id" : 200,
          "sortname" : "SB",
          "countryName" : "Solomon Islands",
          "phonecode" : 677
        },
        {
          "id" : 201,
          "sortname" : "SO",
          "countryName" : "Somalia",
          "phonecode" : 252
        },
        {
          "id" : 202,
          "sortname" : "ZA",
          "countryName" : "South Africa",
          "phonecode" : 27
        },
        {
          "id" : 203,
          "sortname" : "GS",
          "countryName" : "South Georgia",
          "phonecode" : 0
        },
        {
          "id" : 204,
          "sortname" : "SS",
          "countryName" : "South Sudan",
          "phonecode" : 211
        },
        {
          "id" : 205,
          "sortname" : "ES",
          "countryName" : "Spain",
          "phonecode" : 34
        },
        {
          "id" : 206,
          "sortname" : "LK",
          "countryName" : "Sri Lanka",
          "phonecode" : 94
        },
        {
          "id" : 207,
          "sortname" : "SD",
          "countryName" : "Sudan",
          "phonecode" : 249
        },
        {
          "id" : 208,
          "sortname" : "SR",
          "countryName" : "Suriname",
          "phonecode" : 597
        },
        {
          "id" : 209,
          "sortname" : "SJ",
          "countryName" : "Svalbard And Jan Mayen Islands",
          "phonecode" : 47
        },
        {
          "id" : 210,
          "sortname" : "SZ",
          "countryName" : "Swaziland",
          "phonecode" : 268
        },
        {
          "id" : 211,
          "sortname" : "SE",
          "countryName" : "Sweden",
          "phonecode" : 46
        },
        {
          "id" : 212,
          "sortname" : "CH",
          "countryName" : "Switzerland",
          "phonecode" : 41
        },
        {
          "id" : 213,
          "sortname" : "SY",
          "countryName" : "Syria",
          "phonecode" : 963
        },
        {
          "id" : 214,
          "sortname" : "TW",
          "countryName" : "Taiwan",
          "phonecode" : 886
        },
        {
          "id" : 215,
          "sortname" : "TJ",
          "countryName" : "Tajikistan",
          "phonecode" : 992
        },
        {
          "id" : 216,
          "sortname" : "TZ",
          "countryName" : "Tanzania",
          "phonecode" : 255
        },
        {
          "id" : 217,
          "sortname" : "TH",
          "countryName" : "Thailand",
          "phonecode" : 66
        },
        {
          "id" : 218,
          "sortname" : "TG",
          "countryName" : "Togo",
          "phonecode" : 228
        },
        {
          "id" : 219,
          "sortname" : "TK",
          "countryName" : "Tokelau",
          "phonecode" : 690
        },
        {
          "id" : 220,
          "sortname" : "TO",
          "countryName" : "Tonga",
          "phonecode" : 676
        },
        {
          "id" : 221,
          "sortname" : "TT",
          "countryName" : "Trinidad And Tobago",
          "phonecode" : 1868
        },
        {
          "id" : 222,
          "sortname" : "TN",
          "countryName" : "Tunisia",
          "phonecode" : 216
        },
        {
          "id" : 223,
          "sortname" : "TR",
          "countryName" : "Turkey",
          "phonecode" : 90
        },
        {
          "id" : 224,
          "sortname" : "TM",
          "countryName" : "Turkmenistan",
          "phonecode" : 7370
        },
        {
          "id" : 225,
          "sortname" : "TC",
          "countryName" : "Turks And Caicos Islands",
          "phonecode" : 1649
        },
        {
          "id" : 226,
          "sortname" : "TV",
          "countryName" : "Tuvalu",
          "phonecode" : 688
        },
        {
          "id" : 227,
          "sortname" : "UG",
          "countryName" : "Uganda",
          "phonecode" : 256
        },
        {
          "id" : 228,
          "sortname" : "UA",
          "countryName" : "Ukraine",
          "phonecode" : 380
        },
        {
          "id" : 229,
          "sortname" : "AE",
          "countryName" : "United Arab Emirates",
          "phonecode" : 971
        },
        {
          "id" : 230,
          "sortname" : "GB",
          "countryName" : "United Kingdom",
          "phonecode" : 44
        },
        {
          "id" : 231,
          "sortname" : "US",
          "countryName" : "United States",
          "phonecode" : 1
        },
        {
          "id" : 232,
          "sortname" : "UM",
          "countryName" : "United States Minor Outlying Islands",
          "phonecode" : 1
        },
        {
          "id" : 233,
          "sortname" : "UY",
          "countryName" : "Uruguay",
          "phonecode" : 598
        },
        {
          "id" : 234,
          "sortname" : "UZ",
          "countryName" : "Uzbekistan",
          "phonecode" : 998
        },
        {
          "id" : 235,
          "sortname" : "VU",
          "countryName" : "Vanuatu",
          "phonecode" : 678
        },
        {
          "id" : 236,
          "sortname" : "VA",
          "countryName" : "Vatican City State (Holy See)",
          "phonecode" : 39
        },
        {
          "id" : 237,
          "sortname" : "VE",
          "countryName" : "Venezuela",
          "phonecode" : 58
        },
        {
          "id" : 238,
          "sortname" : "VN",
          "countryName" : "Vietnam",
          "phonecode" : 84
        },
        {
          "id" : 239,
          "sortname" : "VG",
          "countryName" : "Virgin Islands (British)",
          "phonecode" : 1284
        },
        {
          "id" : 240,
          "sortname" : "VI",
          "countryName" : "Virgin Islands (US)",
          "phonecode" : 1340
        },
        {
          "id" : 241,
          "sortname" : "WF",
          "countryName" : "Wallis And Futuna Islands",
          "phonecode" : 681
        },
        {
          "id" : 242,
          "sortname" : "EH",
          "countryName" : "Western Sahara",
          "phonecode" : 212
        },
        {
          "id" : 243,
          "sortname" : "YE",
          "countryName" : "Yemen",
          "phonecode" : 967
        },
        {
          "id" : 244,
          "sortname" : "YU",
          "countryName" : "Yugoslavia",
          "phonecode" : 38
        },
        {
          "id" : 245,
          "sortname" : "ZM",
          "countryName" : "Zambia",
          "phonecode" : 260
        },
        {
          "id" : 246,
          "sortname" : "ZW",
          "countryName" : "Zimbabwe",
          "phonecode" : 263
        } 
     ], {});

  },

  down: async (queryInterface, Sequelize) => {
 await queryInterface.bulkDelete('countries', null, {});
  }
};
