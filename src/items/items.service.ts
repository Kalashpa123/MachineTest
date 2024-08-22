// src/items/items.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheModule } from '@nestjs/cache-manager';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  
  async findAll(): Promise<Item[]> {
    const cacheKey = 'items_list';
    const cachedItems = await this.cacheManager.get<Item[]>(cacheKey);

    if (cachedItems) {
      return cachedItems;
    }

    const items = await this.itemRepository.find();
    await this.cacheManager.set(cacheKey, items); 
    return items;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    const savedItem = await this.itemRepository.save(newItem);

    // Invalidate cache
    await this.cacheManager.del('items_list');

    return savedItem;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    const updatedItem = await this.itemRepository.findOne({where:{id}});

    // Invalidate cache
    await this.cacheManager.del('items_list');

    return updatedItem;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.itemRepository.delete(id);

    // Invalidate cache
    await this.cacheManager.del('items_list');

    return result.affected > 0;
  }

  async findByName(name: string): Promise<Item | undefined> {
    return this.itemRepository.findOne({ where: { name } });
  }
}
