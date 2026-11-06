"use server";

import { jwtVerify } from "jose";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getFuncionarioData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("@gestao-escolar/token")?.value;

  if (!token) {
    return "Erro: Token não encontrado";
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  let response: Response;
  try {
    response = await fetch(
      `${process.env.API_URL}/funcionarios/${payload.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["pegarDadosFuncionario"] },
      },
    );
  } catch (e) {
    console.error(e);
    return "Falha na requisição";
  }

  if (response.status === 401) {
    redirect("/");
  }

  const data = await response.json();
  return data;
}

export default async function editFuncionarioData(
  id: number,
  formData: FormData,
) {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");
  const nascimento = formData.get("nascimento");
  const cpf = formData.get("cpf");
  const endereco = formData.get("endereco");
  const cargo = formData.get("cargo");
  const senha = formData.get("senha");

  const cookieStore = await cookies();
  const token = cookieStore.get("@gestao-escolar/token")?.value;

  if (!token) {
    return "Erro: Token não encontrado";
  }

  let response: Response;
  try {
    response = await fetch(`${process.env.API_URL}/funcionarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome,
        email,
        telefone: telefone ? +telefone : undefined,
        nascimento,
        cpf,
        endereco,
        cargo,
        senha,
      }),
    });
  } catch (e) {
    console.error(e);
    return "Falha na requisição";
  }

  if (response.status === 401) {
    redirect("/");
  }

  if (response.status === 200) {
    revalidateTag("pegarDadosFuncionario", "max");
    return;
  }

  const data = await response.json();
  return data;
}