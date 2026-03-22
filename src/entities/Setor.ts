import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario.js";
import { Requisicao } from "./Requisicao.js";

@Entity("setor")
export class Setor {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'text', nullable: false })
    nome!: string;

    @Column({ type: 'text', nullable: true })
    descricao?: string | null;

    @OneToMany(() => Usuario, (Usuario) => Usuario.setor)
    usuarios!: Usuario[];

    @OneToMany(() => Requisicao, (r) => r.setor)
    requisicoes!: Requisicao[]

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date;

}