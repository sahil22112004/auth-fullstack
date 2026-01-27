import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('discount')
export class Discount {
      @PrimaryGeneratedColumn('uuid')
      id: string;
      
      @Column()
      discountName: string;
    
      @Column()
      discountPercentage: string;
}
