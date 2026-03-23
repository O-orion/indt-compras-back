import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Requisicao } from "./Requisicao.js";

@Entity('itemRequisicao')
export class ItemRequisicao {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text", nullable: false })
    descricao!: string;

    @Column({ type: 'numeric', nullable: false })
    quantidade!: number;

    @Column({ type: "text", nullable: false })
    unidade!: string;

    @Column({ type: "text", nullable: true })
    especificao?: string | null;

    @ManyToOne(() => Requisicao, (r) => r.itens, { nullable: false })
    @JoinColumn({ name: 'requisicao_id'})
    requisicao!: Requisicao;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date

}
