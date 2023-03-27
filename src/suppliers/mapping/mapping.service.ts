import { Injectable } from '@nestjs/common';

@Injectable()
export class mappingService {
  constructor() {}

  public clenConverter(data: any) {
    try {
      const objTitles = {
        Наименование: 'title',
        Артикул: 'article',
        'Артикул произв.': 'articleOfProducer',
        Производитель: 'producer',
        Страна: 'country',
        'Цена без учета скидки, руб.': 'priceListId',
        'Цена с учетом скидок, руб': 'priceRrc',
        Наличие: 'productAilability',
      };

      const newTitle = {};
      const dataFileArray = [];

      for (const obj of data) {
        if (!Object.keys(newTitle).length) {
          for (const key of Object.keys(obj)) {
            if (objTitles[obj[key]]) {
              newTitle[key] = objTitles[obj[key]];
            }
          }
        } else {
          const objData = {};

          for (const key of Object.keys(obj)) {
            if (newTitle[key] == 'article') {
              objData[newTitle[key]] = obj[key].toString();
            } else if (newTitle[key]) {
              objData[newTitle[key]] = obj[key];
            }
          }
          dataFileArray.push(objData);
        }
      }
      return dataFileArray;
    } catch (error) {
      console.log(error);
      throw new Error('The file was not converted');
    }
  }
  public grkConverter(data: any) {
    try {
      const dataFileArray = [];
      for (const obj of data.Остатки.Номенклатура) {
        dataFileArray.push({
          articleOfProducer: obj.Код._text,
          title: obj.Наименование._text,
          article: obj.Артикул._text,
          producer: obj.Бренд._text,
          productAilability: obj.Остаток._text,
          priceListId: obj.Цена._text,
        });
      }
      return dataFileArray;
    } catch (error) {
      console.error();
      throw new Error('The file was not converted');
    }
  }
}
