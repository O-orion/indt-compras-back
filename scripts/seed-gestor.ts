import "reflect-metadata";
import "dotenv/config";
import { hash } from "bcryptjs";
import { appDataSource } from "../src/database/appDataSource.js";
import { Setor } from "../src/entities/Setor.js";
import { Usuario } from "../src/entities/Usuario.js";
import { Perfil } from "../src/types/Perfil.js";

const setorConfig = {
    nome:
        process.env.SEED_SETOR_NOME ??
        process.env.SEED_GESTOR_SETOR ??
        "Gestao",
    descricao:
        process.env.SEED_SETOR_DESC ??
        process.env.SEED_GESTOR_SETOR_DESC ??
        "Setor padrao de gestao",
};

const usuariosConfig = [
    {
        perfil: Perfil.GESTOR,
        nome: process.env.SEED_GESTOR_NOME ?? "Gestor Seed",
        email: process.env.SEED_GESTOR_EMAIL ?? "gestor@indt.com",
        password: process.env.SEED_GESTOR_PASSWORD ?? "12345",
    },
    {
        perfil: Perfil.SOLICITANTE,
        nome: process.env.SEED_SOLICITANTE_NOME ?? "Solicitante Seed",
        email: process.env.SEED_SOLICITANTE_EMAIL ?? "solicitante@indt.com",
        password: process.env.SEED_SOLICITANTE_PASSWORD ?? "12345678",
    },
    {
        perfil: Perfil.COMPRADOR,
        nome: process.env.SEED_COMPRADOR_NOME ?? "Comprador Seed",
        email: process.env.SEED_COMPRADOR_EMAIL ?? "comprador@indt.com",
        password: process.env.SEED_COMPRADOR_PASSWORD ?? "12345678",
    },
];

async function main() {
    await appDataSource.initialize();

    const setorRepo = appDataSource.getRepository(Setor);
    const userRepo = appDataSource.getRepository(Usuario);

    let setor = await setorRepo.findOne({
        where: { nome: setorConfig.nome },
    });

    if (!setor) {
        setor = await setorRepo.save({
            nome: setorConfig.nome,
            descricao: setorConfig.descricao,
        });
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const usuarioSeed of usuariosConfig) {
        const passwordProvided = usuarioSeed.password.trim().length > 0;
        const usuarioExistente = await userRepo.findOne({
            where: { email: usuarioSeed.email },
        });

        if (usuarioExistente) {
            if (passwordProvided) {
                usuarioExistente.senha_hash = await hash(
                    usuarioSeed.password,
                    10
                );
            }
            usuarioExistente.nome = usuarioSeed.nome;
            usuarioExistente.perfil = usuarioSeed.perfil;
            usuarioExistente.setor = setor;

            await userRepo.save(usuarioExistente);
            updated += 1;
            console.log(
                `Seed usuarios: atualizado ${Perfil[usuarioSeed.perfil]} (${usuarioSeed.email})`
            );
            continue;
        }

        if (!passwordProvided) {
            console.log(
                `Seed usuarios: senha vazia para ${usuarioSeed.email}. Pulando criacao.`
            );
            skipped += 1;
            continue;
        }

        const senha_hash = await hash(usuarioSeed.password, 10);
        const usuario = userRepo.create({
            nome: usuarioSeed.nome,
            email: usuarioSeed.email,
            senha_hash,
            perfil: usuarioSeed.perfil,
            setor,
        });

        await userRepo.save(usuario);
        created += 1;
        console.log(
            `Seed usuarios: criado ${Perfil[usuarioSeed.perfil]} (${usuarioSeed.email})`
        );
    }

    console.log(
        `Seed usuarios finalizado. Criados: ${created}. Atualizados: ${updated}. Ignorados: ${skipped}.`
    );
}

main()
    .catch((error) => {
        console.error("Erro ao executar seed gestor:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        if (appDataSource.isInitialized) {
            await appDataSource.destroy();
        }
    });
