import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOptionsService } from './providers/meta-option.service';

@Controller('meta-option')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}
  @Post()
  public create(@Body() createPostMetaOptionDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionDto);
  }
}
