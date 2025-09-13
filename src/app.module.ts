import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaService } from './prisma/prisma.services';
import { ContactsModule } from './contacts/contacts.module';
import { InteractionsModule } from './interactions/interactions.module';
import { TagsModule } from './tags/tags.module';
import { PreferencesModule } from './preferences/preferences.module';
import { SocialModule } from './social/social.module';
import { SearchModule } from './search/search.module';
import { ImportExportModule } from './import-export/import-export.module';
import { AlertsModule } from './alerts/alerts.module';
import { ActivityModule } from './actitivity/activity.module';


@Module({
imports: [
ConfigModule,
ContactsModule,
InteractionsModule,
TagsModule,
PreferencesModule,
SocialModule,
SearchModule,
ImportExportModule,
AlertsModule,
ActivityModule,
],
providers: [PrismaService],
})
export class AppModule {}