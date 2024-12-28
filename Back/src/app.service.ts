import { Injectable } from '@nestjs/common';

export interface ApiInfo {
  endpoints: {
    [key: string]: {
      path: string;
      description: string;
      methods: string[];
      example?: string;
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
        },
        cryptoDetails: {
          path: '/api/crypto/:id',
          description: 'Endpoint pour obtenir les informations sur une crypto-monnaie spécifique',
          methods: ['GET'],
          example: '/api/crypto/bitcoin',
        },
        widgets: {
          path: '/api/widgets',
          description: 'Endpoint pour gérer les widgets',
          methods: ['GET', 'POST'],
        },
        widgetById: {
          path: '/api/widgets/:id',
          description: 'Endpoint pour gérer un widget spécifique avec son ID',
          methods: ['PUT', 'DELETE'],
        },
        dashboards: {
          path: '/api/dashboards',
          description: 'Endpoint pour créer un nouveau dashboard',
          methods: ['POST'],
        },
        dashboardByCode: {
          path: '/api/dashboards/:code',
          description: 'Endpoint pour récupérer un dashboard spécifique avec son code',
          methods: ['GET'],
        },
      },
    };
  }
}
