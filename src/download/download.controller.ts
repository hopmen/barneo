import { Controller, Get, Query } from '@nestjs/common';
import { DownloadService } from './download.service';
import { UrlDto } from './Dto/url.dto';

@Controller()
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('xlsx')
  public async getXlsx(@Query() urlDto: UrlDto) {
    return this.downloadService.xlsx(urlDto);
  }
}