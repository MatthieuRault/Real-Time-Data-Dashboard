import { Injectable } from '@nestjs/common';

export interface ApiInfo {
  endpoints: {
    [key: string]: {
      path: string;
      description: string;
      methods: string[];
      example: string; // Ajout du champ example
    };
  };
}

@Injectable()
export class AppService {
  getApiInfo(): ApiInfo {
    return {
      endpoints: {
        api: {
          path: '/api',
          description: "Endpoint pour obtenir les informations de toutes les routes de l'API",
          methods: ['GET'],
          example: '/api',
        },
        weather: {
          path: '/api/weather/:city',
          description: "Endpoint pour obtenir les informations météorologiques d'une ville donnée",
          methods: ['GET'],
          example: '/api/weather/paris',
        },
        cryptoList: {
          path: '/api/crypto',
          description: 'Endpoint pour obtenir les informations sur le top 10 des cryptomonnaies',
          methods: ['GET'],
          example: '/api/crypto',
        },
        cryptoDetails: {
          path: '/api/crypto/:id',
          description: 'Endpoint pour obtenir les informations sur une crypto-monnaie spécifique',
          methods: ['GET'],
          example: '/api/crypto/bitcoin',
        },
        widgets: {
          path: '/api/widgets',
          description: "Endpoint pour obtenir les informations sur l'ensemble des widgets",
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          example: '/api/widgets',
        },
      },
    };
  }
}
