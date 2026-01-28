import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Advertisement')
export class Advertisment {
@PrimaryGeneratedColumn()
id: number;

@Column()
url: string;
}