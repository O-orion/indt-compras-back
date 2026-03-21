import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Urgencia } from "../types/Urgencia.js";
import { Status } from "../types/Status.js";
import { Usuario } from "./Usuario.js";
import { Setor } from "./Setor.js";
import { ItemRequisicao } from "./ItemRequisicao.js";

@Entity("requisicao")
export class Requisicao {

    @PrimaryGeneratedColumn("uuid")
    id!: string;
    
    @Column({ type: "text", nullable: false, unique: true })
    numero!: string;

    @Column({ type: "text", nullable: false })
    titulo!: string;

    @Column({ type: "text", nullable: false })
    descricao!: string;

    @Column({ type: "text", nullable: false })
    justificativa!: string;

    @Column({ type: "enum", enum: Urgencia, default: Urgencia.NORMAL, nullable: false })
    urgencia!: Urgencia

    @Column({ type: "enum", enum: Status, default: Status.RASCUNHO, nullable: false })
    status!: Status

    @Column({  type: 'timestamp', nullable: false })
    prazo_necessidade!: Date

    @Column({ type: 'timestamptz', nullable: true })
    aprovado_em!: Date;

    @Column({ type: "text", nullable: true })
    comentario_aprovacao!: string;

    @Column({ type: 'numeric', nullable: true })
    valor_total_aprovado!: number;

    @ManyToOne(() => Usuario, (u) => u.requisicoes_abertas, { nullable: false })
    solicitante!: Usuario;

    @ManyToOne(() => Usuario, { nullable: true })
    aprovador!: Usuario | null;

    @ManyToOne(() => Setor, (s) => s.requisicoes, { nullable: false } )
    @JoinColumn({ name: 'setor_id' })
    setor!: Setor;

    @ManyToOne(() => Usuario, { nullable: true})
    @JoinColumn({name: 'comprador_id'})
    comprador!: Usuario | null;

    @OneToMany(() => ItemRequisicao, (item) => item.requisicao)
    itens!: ItemRequisicao

    @CreateDateColumn({ type: 'timestamptz' })
    created_at!: Date
}