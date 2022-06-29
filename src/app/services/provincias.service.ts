import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Provincias, Cantones } from '../interfaces/provincias.interfaces';
import { Observable } from 'rxjs';
import { Image } from 'angular-responsive-carousel';

@Injectable({
  providedIn: 'root',
})
export class ProvinciasService {
  public provincia: Provincias[];
  public cantones: Cantones[] = [
    {
      id: 1,
      provinciaId: 'AZUAY',
      nombreCanton: 'CUENCA',
    },
    {
      id: 2,
      provinciaId: 'AZUAY',
      nombreCanton: 'GIRÓN',
    },
    {
      id: 3,
      provinciaId: 'AZUAY',
      nombreCanton: 'GUALACEO',
    },
    {
      id: 4,
      provinciaId: 'AZUAY',
      nombreCanton: 'NABÓN',
    },
    {
      id: 5,
      provinciaId: 'AZUAY',
      nombreCanton: 'PAUTE',
    },
    {
      id: 6,
      provinciaId: 'AZUAY',
      nombreCanton: 'PUCARA',
    },
    {
      id: 7,
      provinciaId: 'AZUAY',
      nombreCanton: 'SAN FERNANDO',
    },
    {
      id: 8,
      provinciaId: 'AZUAY',
      nombreCanton: 'SANTA ISABEL',
    },
    {
      id: 9,
      provinciaId: 'AZUAY',
      nombreCanton: 'SIGSIG',
    },
    {
      id: 10,
      provinciaId: 'AZUAY',
      nombreCanton: 'OÑA',
    },
    {
      id: 11,
      provinciaId: 'AZUAY',
      nombreCanton: 'CHORDELEG',
    },
    {
      id: 12,
      provinciaId: 'AZUAY',
      nombreCanton: 'EL PAN',
    },
    {
      id: 13,
      provinciaId: 'AZUAY',
      nombreCanton: 'SEVILLA DE ORO',
    },
    {
      id: 14,
      provinciaId: 'AZUAY',
      nombreCanton: 'GUACHAPALA',
    },
    {
      id: 15,
      provinciaId: 'AZUAY',
      nombreCanton: 'CAMILO PONCE ENRÍQUEZ',
    },
    {
      id: 16,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'GUARANDA',
    },
    {
      id: 17,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'CHILLANES',
    },
    {
      id: 18,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'CHIMBO',
    },
    {
      id: 19,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'ECHEANDÍA',
    },
    {
      id: 20,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'SAN MIGUEL',
    },
    {
      id: 21,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'CALUMA',
    },
    {
      id: 22,
      provinciaId: 'BOLIVAR',
      nombreCanton: 'LAS NAVES',
    },
    {
      id: 23,
      provinciaId: 'CAÑAR',
      nombreCanton: 'AZOGUES',
    },
    {
      id: 24,
      provinciaId: 'CAÑAR',
      nombreCanton: 'BIBLIÁN',
    },
    {
      id: 25,
      provinciaId: 'CAÑAR',
      nombreCanton: 'CAÑAR',
    },
    {
      id: 26,
      provinciaId: 'CAÑAR',
      nombreCanton: 'LA TRONCAL',
    },
    {
      id: 27,
      provinciaId: 'CAÑAR',
      nombreCanton: 'EL TAMBO',
    },
    {
      id: 28,
      provinciaId: 'CAÑAR',
      nombreCanton: 'DÉLEG',
    },
    {
      id: 29,
      provinciaId: 'CAÑAR',
      nombreCanton: 'SUSCAL',
    },
    {
      id: 30,
      provinciaId: 'CARCHI',
      nombreCanton: 'TULCÁN',
    },
    {
      id: 31,
      provinciaId: 'CARCHI',
      nombreCanton: 'BOLÍVAR',
    },
    {
      id: 32,
      provinciaId: 'CARCHI',
      nombreCanton: 'ESPEJO',
    },
    {
      id: 33,
      provinciaId: 'CARCHI',
      nombreCanton: 'MIRA',
    },
    {
      id: 34,
      provinciaId: 'CARCHI',
      nombreCanton: 'MONTÚFAR',
    },
    {
      id: 35,
      provinciaId: 'CARCHI',
      nombreCanton: 'SAN PEDRO DE HUACA',
    },
    {
      id: 36,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'LATACUNGA',
    },
    {
      id: 37,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'LA MANÁ',
    },
    {
      id: 38,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'PANGUA',
    },
    {
      id: 39,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'PUJILI',
    },
    {
      id: 40,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'SALCEDO',
    },
    {
      id: 41,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'SAQUISILÍ',
    },
    {
      id: 42,
      provinciaId: 'COTOPAXI',
      nombreCanton: 'SIGCHOS',
    },
    {
      id: 43,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'RIOBAMBA',
    },
    {
      id: 44,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'ALAUSI',
    },
    {
      id: 45,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'COLTA',
    },
    {
      id: 46,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'CHAMBO',
    },
    {
      id: 47,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'CHUNCHI',
    },
    {
      id: 48,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'GUAMOTE',
    },
    {
      id: 49,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'GUANO',
    },
    {
      id: 50,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'PALLATANGA',
    },
    {
      id: 51,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'PENIPE',
    },
    {
      id: 52,
      provinciaId: 'CHIMBORAZO',
      nombreCanton: 'CUMANDÁ',
    },
    {
      id: 53,
      provinciaId: 'EL ORO',
      nombreCanton: 'MACHALA',
    },
    {
      id: 54,
      provinciaId: 'EL ORO',
      nombreCanton: 'ARENILLAS',
    },
    {
      id: 55,
      provinciaId: 'EL ORO',
      nombreCanton: 'ATAHUALPA',
    },
    {
      id: 56,
      provinciaId: 'EL ORO',
      nombreCanton: 'BALSAS',
    },
    {
      id: 57,
      provinciaId: 'EL ORO',
      nombreCanton: 'CHILLA',
    },
    {
      id: 58,
      provinciaId: 'EL ORO',
      nombreCanton: 'EL GUABO',
    },
    {
      id: 59,
      provinciaId: 'EL ORO',
      nombreCanton: 'HUAQUILLAS',
    },
    {
      id: 60,
      provinciaId: 'EL ORO',
      nombreCanton: 'MARCABELÍ',
    },
    {
      id: 61,
      provinciaId: 'EL ORO',
      nombreCanton: 'PASAJE',
    },
    {
      id: 62,
      provinciaId: 'EL ORO',
      nombreCanton: 'PIÑAS',
    },
    {
      id: 63,
      provinciaId: 'EL ORO',
      nombreCanton: 'PORTOVELO',
    },
    {
      id: 64,
      provinciaId: 'EL ORO',
      nombreCanton: 'SANTA ROSA',
    },
    {
      id: 65,
      provinciaId: 'EL ORO',
      nombreCanton: 'ZARUMA',
    },
    {
      id: 66,
      provinciaId: 'EL ORO',
      nombreCanton: 'LAS LAJAS',
    },
    {
      id: 67,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'ESMERALDAS',
    },
    {
      id: 68,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'ELOY ALFARO',
    },
    {
      id: 69,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'MUISNE',
    },
    {
      id: 70,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'QUININDÉ',
    },
    {
      id: 71,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'SAN LORENZO',
    },
    {
      id: 72,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'ATACAMES',
    },
    {
      id: 73,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'RIOVERDE',
    },
    {
      id: 74,
      provinciaId: 'ESMERALDAS',
      nombreCanton: 'LA CONCORDIA',
    },
    {
      id: 75,
      provinciaId: 'GUAYAS',
      nombreCanton: 'GUAYAQUIL',
    },
    {
      id: 76,
      provinciaId: 'GUAYAS',
      nombreCanton: 'ALFREDO BAQUERIZO MORENO (JUJÁN)',
    },
    {
      id: 77,
      provinciaId: 'GUAYAS',
      nombreCanton: 'BALAO',
    },
    {
      id: 78,
      provinciaId: 'GUAYAS',
      nombreCanton: 'BALZAR',
    },
    {
      id: 79,
      provinciaId: 'GUAYAS',
      nombreCanton: 'COLIMES',
    },
    {
      id: 80,
      provinciaId: 'GUAYAS',
      nombreCanton: 'DAULE',
    },
    {
      id: 81,
      provinciaId: 'GUAYAS',
      nombreCanton: 'DURÁN',
    },
    {
      id: 82,
      provinciaId: 'GUAYAS',
      nombreCanton: 'EL EMPALME',
    },
    {
      id: 83,
      provinciaId: 'GUAYAS',
      nombreCanton: 'EL TRIUNFO',
    },
    {
      id: 84,
      provinciaId: 'GUAYAS',
      nombreCanton: 'MILAGRO',
    },
    {
      id: 85,
      provinciaId: 'GUAYAS',
      nombreCanton: 'NARANJAL',
    },
    {
      id: 86,
      provinciaId: 'GUAYAS',
      nombreCanton: 'NARANJITO',
    },
    {
      id: 87,
      provinciaId: 'GUAYAS',
      nombreCanton: 'PALESTINA',
    },
    {
      id: 88,
      provinciaId: 'GUAYAS',
      nombreCanton: 'PEDRO CARBO',
    },
    {
      id: 89,
      provinciaId: 'GUAYAS',
      nombreCanton: 'SAMBORONDÓN',
    },
    {
      id: 90,
      provinciaId: 'GUAYAS',
      nombreCanton: 'SANTA LUCÍA',
    },
    {
      id: 91,
      provinciaId: 'GUAYAS',
      nombreCanton: 'SALITRE (URBINA JADO)',
    },
    {
      id: 92,
      provinciaId: 'GUAYAS',
      nombreCanton: 'SAN JACINTO DE YAGUACHI',
    },
    {
      id: 93,
      provinciaId: 'GUAYAS',
      nombreCanton: 'PLAYAS',
    },
    {
      id: 94,
      provinciaId: 'GUAYAS',
      nombreCanton: 'SIMÓN BOLÍVAR',
    },
    {
      id: 95,
      provinciaId: 'GUAYAS',
      nombreCanton: 'CORONEL MARCELINO MARIDUEÑA',
    },
    {
      id: 96,
      provinciaId: 'GUAYAS',
      nombreCanton: 'LOMAS DE SARGENTILLO',
    },
    {
      id: 97,
      provinciaId: 'GUAYAS',
      nombreCanton: 'NOBOL',
    },
    {
      id: 98,
      provinciaId: 'GUAYAS',
      nombreCanton: 'GENERAL ANTONIO ELIZALDE',
    },
    {
      id: 99,
      provinciaId: 'GUAYAS',
      nombreCanton: 'ISIDRO AYORA',
    },
    {
      id: 100,
      provinciaId: 'IMBABURA',
      nombreCanton: 'IBARRA',
    },
    {
      id: 101,
      provinciaId: 'IMBABURA',
      nombreCanton: 'ANTONIO ANTE',
    },
    {
      id: 102,
      provinciaId: 'IMBABURA',
      nombreCanton: 'COTACACHI',
    },
    {
      id: 103,
      provinciaId: 'IMBABURA',
      nombreCanton: 'OTAVALO',
    },
    {
      id: 104,
      provinciaId: 'IMBABURA',
      nombreCanton: 'PIMAMPIRO',
    },
    {
      id: 105,
      provinciaId: 'IMBABURA',
      nombreCanton: 'SAN MIGUEL DE URCUQUÍ',
    },
    {
      id: 106,
      provinciaId: 'LOJA',
      nombreCanton: 'LOJA',
    },
    {
      id: 107,
      provinciaId: 'LOJA',
      nombreCanton: 'CALVAS',
    },
    {
      id: 108,
      provinciaId: 'LOJA',
      nombreCanton: 'CATAMAYO',
    },
    {
      id: 109,
      provinciaId: 'LOJA',
      nombreCanton: 'CELICA',
    },
    {
      id: 110,
      provinciaId: 'LOJA',
      nombreCanton: 'CHAGUARPAMBA',
    },
    {
      id: 111,
      provinciaId: 'LOJA',
      nombreCanton: 'ESPÍNDOLA',
    },
    {
      id: 112,
      provinciaId: 'LOJA',
      nombreCanton: 'GONZANAMÁ',
    },
    {
      id: 113,
      provinciaId: 'LOJA',
      nombreCanton: 'MACARÁ',
    },
    {
      id: 114,
      provinciaId: 'LOJA',
      nombreCanton: 'PALTAS',
    },
    {
      id: 115,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'BABAHOYO',
    },
    {
      id: 116,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'BABA',
    },
    {
      id: 117,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'MONTALVO',
    },
    {
      id: 118,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'PUEBLOVIEJO',
    },
    {
      id: 119,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'QUEVEDO',
    },
    {
      id: 120,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'URDANETA',
    },
    {
      id: 121,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'VENTANAS',
    },
    {
      id: 122,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'VÍNCES',
    },
    {
      id: 123,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'PALENQUE',
    },
    {
      id: 124,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'BUENA FÉ',
    },
    {
      id: 125,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'VALENCIA',
    },
    {
      id: 126,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'MOCACHE',
    },
    {
      id: 127,
      provinciaId: 'LOS RIOS',
      nombreCanton: 'QUINSALOMA',
    },
    {
      id: 128,
      provinciaId: 'MANABI',
      nombreCanton: 'PORTOVIEJO',
    },
    {
      id: 129,
      provinciaId: 'MANABI',
      nombreCanton: 'BOLÍVAR',
    },
    {
      id: 130,
      provinciaId: 'MANABI',
      nombreCanton: 'CHONE',
    },
    {
      id: 131,
      provinciaId: 'MANABI',
      nombreCanton: 'EL CARMEN',
    },
    {
      id: 132,
      provinciaId: 'MANABI',
      nombreCanton: 'FLAVIO ALFARO',
    },
    {
      id: 133,
      provinciaId: 'MANABI',
      nombreCanton: 'JIPIJAPA',
    },
    {
      id: 134,
      provinciaId: 'MANABI',
      nombreCanton: 'JUNÍN',
    },
    {
      id: 135,
      provinciaId: 'MANABI',
      nombreCanton: 'MANTA',
    },
    {
      id: 136,
      provinciaId: 'MANABI',
      nombreCanton: 'MONTECRISTI',
    },
    {
      id: 137,
      provinciaId: 'MANABI',
      nombreCanton: 'PAJÁN',
    },
    {
      id: 138,
      provinciaId: 'MANABI',
      nombreCanton: 'PICHINCHA',
    },
    {
      id: 139,
      provinciaId: 'MANABI',
      nombreCanton: 'ROCAFUERTE',
    },
    {
      id: 140,
      provinciaId: 'MANABI',
      nombreCanton: 'SANTA ANA',
    },
    {
      id: 141,
      provinciaId: 'MANABI',
      nombreCanton: 'SUCRE',
    },
    {
      id: 142,
      provinciaId: 'MANABI',
      nombreCanton: 'TOSAGUA',
    },
    {
      id: 143,
      provinciaId: 'MANABI',
      nombreCanton: '24 DE MAYO',
    },
    {
      id: 144,
      provinciaId: 'MANABI',
      nombreCanton: 'PEDERNALES',
    },
    {
      id: 145,
      provinciaId: 'MANABI',
      nombreCanton: 'OLMEDO',
    },
    {
      id: 146,
      provinciaId: 'MANABI',
      nombreCanton: 'PUERTO LÓPEZ',
    },
    {
      id: 147,
      provinciaId: 'MANABI',
      nombreCanton: 'JAMA',
    },
    {
      id: 148,
      provinciaId: 'MANABI',
      nombreCanton: 'JARAMIJÓ',
    },
    {
      id: 149,
      provinciaId: 'MANABI',
      nombreCanton: 'SAN VICENTE',
    },
    {
      id: 150,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'MORONA',
    },
    {
      id: 151,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'GUALAQUIZA',
    },
    {
      id: 152,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'LIMÓN INDANZA',
    },
    {
      id: 153,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'PALORA',
    },
    {
      id: 154,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'SANTIAGO',
    },
    {
      id: 155,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'SUCÚA',
    },
    {
      id: 156,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'HUAMBOYA',
    },
    {
      id: 157,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'SAN JUAN BOSCO',
    },
    {
      id: 158,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'TAISHA',
    },
    {
      id: 159,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'LOGROÑO',
    },
    {
      id: 160,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'PABLO SEXTO',
    },
    {
      id: 161,
      provinciaId: 'MORONA SANTIAGO',
      nombreCanton: 'TIWINTZA',
    },
    {
      id: 162,
      provinciaId: 'NAPO',
      nombreCanton: 'PALESTINA',
    },
    {
      id: 163,
      provinciaId: 'NAPO',
      nombreCanton: 'ARCHIDONA',
    },
    {
      id: 164,
      provinciaId: 'NAPO',
      nombreCanton: 'EL CHACO',
    },
    {
      id: 165,
      provinciaId: 'NAPO',
      nombreCanton: 'QUIJOS',
    },
    {
      id: 166,
      provinciaId: 'NAPO',
      nombreCanton: 'CARLOS JULIO AROSEMENA TOLA',
    },
    {
      id: 167,
      provinciaId: 'PASTAZA',
      nombreCanton: 'PASTAZA',
    },
    {
      id: 168,
      provinciaId: 'PASTAZA',
      nombreCanton: 'ESMERALDAS',
    },
    {
      id: 169,
      provinciaId: 'PASTAZA',
      nombreCanton: 'SANTA CLARA',
    },
    {
      id: 170,
      provinciaId: 'PASTAZA',
      nombreCanton: 'ARAJUNO',
    },
    {
      id: 171,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'QUITO',
    },
    {
      id: 172,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'CAYAMBE',
    },
    {
      id: 173,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'MEJIA',
    },
    {
      id: 174,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'PEDRO MONCAYO',
    },
    {
      id: 175,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'RUMIÑAHUI',
    },
    {
      id: 176,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'SAN MIGUEL DE LOS BANCOS',
    },
    {
      id: 177,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'PEDRO VICENTE MALDONADO',
    },
    {
      id: 178,
      provinciaId: 'PICHINCHA',
      nombreCanton: 'PUERTO QUITO',
    },
    {
      id: 179,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'AMBATO',
    },
    {
      id: 180,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'BAÑOS DE AGUA SANTA',
    },
    {
      id: 181,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'CEVALLOS',
    },
    {
      id: 182,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'MOCACHE',
    },
    {
      id: 183,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'PATATE',
    },
    {
      id: 184,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'QUERO',
    },
    {
      id: 185,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'SAN PEDRO DE PELILEO',
    },
    {
      id: 186,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'SANTIAGO DE PÍLLARO',
    },
    {
      id: 187,
      provinciaId: 'TUNGURAHUA',
      nombreCanton: 'TISALEO',
    },
    {
      id: 188,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'ZAMORA',
    },
    {
      id: 189,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'CHINCHIPE',
    },
    {
      id: 190,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'NANGARITZA',
    },
    {
      id: 191,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'YACUAMBI',
    },
    {
      id: 192,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'YANTZAZA (YANZATZA)',
    },
    {
      id: 193,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'EL PANGUI',
    },
    {
      id: 194,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'CENTINELA DEL CÓNDOR',
    },
    {
      id: 195,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'PALANDA',
    },
    {
      id: 196,
      provinciaId: 'ZAMORA CHINCHIPE',
      nombreCanton: 'PAQUISHA',
    },
    {
      id: 197,
      provinciaId: 'GALAPAGOS',
      nombreCanton: 'SAN CRISTÓBAL',
    },
    {
      id: 198,
      provinciaId: 'GALAPAGOS',
      nombreCanton: 'ISABELA',
    },
    {
      id: 199,
      provinciaId: 'GALAPAGOS',
      nombreCanton: 'SANTA CRUZ',
    },
    {
      id: 200,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'LAGO AGRIO',
    },
    {
      id: 201,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'GONZALO PIZARRO',
    },
    {
      id: 202,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'PUTUMAYO',
    },
    {
      id: 203,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'SHUSHUFINDI',
    },
    {
      id: 204,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'SUCUMBÍOS',
    },
    {
      id: 205,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'CASCALES',
    },
    {
      id: 206,
      provinciaId: 'SUCUMBIOS',
      nombreCanton: 'CUYABENO',
    },
    {
      id: 207,
      provinciaId: 'ORELLANA',
      nombreCanton: 'ORELLANA',
    },
    {
      id: 208,
      provinciaId: 'ORELLANA',
      nombreCanton: 'AGUARICO',
    },
    {
      id: 209,
      provinciaId: 'ORELLANA',
      nombreCanton: 'LA JOYA DE LOS SACHAS',
    },
    {
      id: 210,
      provinciaId: 'ORELLANA',
      nombreCanton: 'LORETO',
    },
    {
      id: 211,
      provinciaId: 'SANTO DOMINGO DE LOS TSACHILAS',
      nombreCanton: 'SANTO DOMINGO',
    },
    {
      id: 212,
      provinciaId: 'SANTA ELENA',
      nombreCanton: 'SANTA ELENA',
    },
    {
      id: 213,
      provinciaId: 'SANTA ELENA',
      nombreCanton: 'LA LIBERTAD',
    },
    {
      id: 214,
      provinciaId: 'SANTA ELENA',
      nombreCanton: 'SALINAS',
    }
  ];

  constructor(private http: HttpClient) {}

  // getProvincias(): Provincias [] {
  //   return this.provincia;
  // }

  getCantones(id: number): Cantones[] {
    return this.cantones;
  }

  getProvincias(): Observable<Provincias[]> {
    return this.http.get<Provincias[]>('./assets/json/provinciasCantones.json');
  }

  getImages() {
    return this.http.get<any>('./assets/json/images.json')
    .toPromise()
    .then(res => <Image[]>res.data)
    .then(data => { return data; });
  }

  // getCantones(): Observable<Cantones[]>  {
  //   return this.http.get<Cantones[]>('./assets/json/cantones.json');
  // }
}
