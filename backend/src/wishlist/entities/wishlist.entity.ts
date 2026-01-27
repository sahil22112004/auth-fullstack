import { Product } from "../../products/entities/product.entity";
import { User } from "../../auth/entities/auth.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Wishlist {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
    
    @Column()
    productId: number;
}
