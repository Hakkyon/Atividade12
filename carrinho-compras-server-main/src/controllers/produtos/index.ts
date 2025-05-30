import { Request, Response } from "express";
import { prismaClient } from "../../prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function CriarProduto(request: Request, response: Response) {
  console.log("Corpo recebido:", request.body);
  const { nome, valor, imagem } = request.body;

  if (!nome || !imagem || isNaN(valor) || valor <= 0) {
    return response.status(400).json({ erro: "Campos inválidos ou valor não numérico/positivo." });
  }

  try {
    const novoProduto = await prismaClient.produto.create({
      data: { nome, valor: parseFloat(valor), imagem },
    });
    return response.status(201).json(novoProduto); // Use 201 para recurso criado
  } catch (e) {
    console.error("Erro ao criar produto:", e);
    if (e instanceof PrismaClientKnownRequestError) {
      return response.status(409).json({ erro: e.code });
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function LerProdutos(request: Request, response: Response) {
  try {
    const produtos = await prismaClient.produto.findMany();
    return response.status(200).json(produtos);
  } catch (e) {
    console.error("Erro ao ler produtos:", e);
    if (e instanceof PrismaClientKnownRequestError) {
      return response.status(409).json({ erro: e.code });
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function DeletarProduto(request: Request, response: Response) {
  const { id } = request.params;

  if (!id || isNaN(Number(id))) {
    return response.status(400).json({ erro: "ID inválido ou não informado." });
  }

  try {
    const produtoDeletado = await prismaClient.produto.delete({
      where: { id: Number(id) },
    });
    return response.status(200).json(produtoDeletado);
  } catch (e) {
    console.error("Erro ao deletar produto:", e);
    if (e instanceof PrismaClientKnownRequestError) {
      return response.status(409).json({ erro: e.code });
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function AtualizarProduto(request: Request, response: Response) {
  const { id } = request.params;
  const { nome, valor, imagem } = request.body;

  if (!id || isNaN(Number(id))) {
    return response.status(400).json({ erro: "ID inválido ou não informado." });
  }

  try {
    const produtoAtualizado = await prismaClient.produto.update({
      where: { id: Number(id) },
      data: {
        nome,
        valor: valor ? parseFloat(valor) : undefined,
        imagem,
      },
    });
    return response.status(200).json(produtoAtualizado);
  } catch (e) {
    console.error("Erro ao atualizar produto:", e);
    if (e instanceof PrismaClientKnownRequestError) {
      return response.status(409).json({ erro: e.code });
    }
    return response.status(500).json({ erro: "Erro no servidor" });
  }
}
