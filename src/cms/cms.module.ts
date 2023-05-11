import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CMSProviders } from './cms.providers';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';

@Module({
  imports: [SharedModule],
  controllers: [ArticleController, MenuController],
  providers: [ArticleService, MenuService, ...CMSProviders],
})
export class CMSModule {}
