import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Perfil } from "../types/Perfil.js";
import { Setor } from "./Setor.js";
import { Requisicao } from "./Requisicao.js";


@Entity('usuario')
export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: 'text', nullable: false })
    nome!: string;

    @Column({ type: 'text', nullable: false })
    senha_hash!: string;

    @Column({ type: 'enum', enum: Perfil, nullable: false })
    perfil!: Perfil

    @ManyToOne(() => Setor, { nullable: false })
    @JoinColumn({ name: 'setor_id' })
    setor!: Setor

    @OneToMany(() => Requisicao, (r) => r.solicitante)
    requisicoes_abertas!: Requisicao[]

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date
}
