import { PartialType } from '@nestjs/mapped-types';
import { CreateAdvertismentDto } from './create-advertisment.dto';

export class UpdateAdvertismentDto extends PartialType(CreateAdvertismentDto) {}
