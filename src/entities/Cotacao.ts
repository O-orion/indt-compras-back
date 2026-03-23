import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cotacao')
export class Cotacao {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text", nullable: false })
    fornecedor!: string;

    @Column({ type: 'numeric', nullable: false })
    preco_unitario!: number;

    @Column({ type: "integer", nullable: true })
    prazo_entrega_dias?: number | null;

    @Column({ type: 'boolean', default: false })
    selecionada!: boolean

    @Column({ type: "text", nullable: true })
    observacao?: string | null;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date
}
