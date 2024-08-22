// src/items/items.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item])
  async getItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Mutation(() => Item, { nullable: true })
  async updateItem(
    @Args('id') id: string,
    @Args('updateItemInput') updateItemDto: UpdateItemDto,
  ): Promise<Item | null> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Mutation(() => Boolean)
  async removeItem(@Args('id') id: string): Promise<boolean> {
    return this.itemsService.remove(id);
  }
}
