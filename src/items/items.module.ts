// src/items/items.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './entities/item.entity';
import { UniqueItemNameValidator } from '../common/validators/unique-item-name.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemsService, ItemsResolver, UniqueItemNameValidator],
  exports: [ItemsService],
})
export class ItemsModule {}
