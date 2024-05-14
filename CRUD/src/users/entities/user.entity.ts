import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({
    name: 'user'
})
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;
    @Column ('varchar',{
        name: 'user',
    })
    user: string;
    @Column ('varchar',{
        name: 'pass',
    })
    pass: string;
}