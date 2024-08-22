// src/common/validators/unique-item-name.validator.ts
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ItemsService } from '../../items/items.service';

@ValidatorConstraint({ async: true })
export class UniqueItemNameValidator implements ValidatorConstraintInterface {
  constructor(private readonly itemsService: ItemsService) {}

  async validate(name: string): Promise<boolean> {
    const existingItem = await this.itemsService.findByName(name);
    return !existingItem;
  }

  defaultMessage(): string {
    return 'Item name already exists';
  }
}
