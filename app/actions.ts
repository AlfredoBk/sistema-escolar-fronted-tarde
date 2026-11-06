"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";

type Funcionario = {
  id?: string | number;
  nome?: string;
  email?: string;
  telefone?: string;
  nascimento?: string;
  cpt?: string;
  endereco?: string;
  cargo?: string;
  matricula?: string;
  status?: string;
};

export async function login(formData: FormData) {
    const email = formData.get("email");
    const senha = formData.get("senha");

    let response: Response;
    try {
        response = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha,
            }),
        });
    } catch (e) {
        console.error(e);
        return "Erro ao comunicar com o servidor"
    }

    const data = await response.json();

    if (response.status !== 200) {
        return data;
    }

    const token =
        typeof data === "string"
            ? data
            : data.token ?? data.accessToken ?? data.access_token;

    if (!token) {
        return "Token não retornado pelo servidor";
    }

    const cookieStore = await cookies();
    cookieStore.set("@gestao-escolar/token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    redirect("/perfil");
}

export async function getFuncionarioData(): Promise<Funcionario | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        redirect("/");
    }

    const payload = decodeJwt(token);
    const id =
        payload.id ??
        payload.funcionarioId ??
        payload.sub;

    if (!id) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.API_URL}/funcionarios/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.funcionario ?? data.data ?? data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function editFuncionariosData(formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("@gestao-escolar/token")?.value;

    if (!token) {
        return "Sessão expirada";
    }

    const payload = decodeJwt(token);
    const id =
        payload.id ??
        payload.funcionarioId ??
        payload.sub;

    if (!id) {
        return "Funcionário não identificado";
    }

    const telefone = formData.get("telefone");
    const senha = formData.get("senha");

    let response: Response;
    try {
        response = await fetch(`${process.env.API_URL}/funcionarios/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nome: formData.get("nome"),
                email: formData.get("email"),
                telefone: telefone || undefined,
                nascimento: formData.get("nascimento"),
                cpt: formData.get("cpf"),
                endereco: formData.get("endereco"),
                cargo: formData.get("cargo"),
                senha: senha || undefined,
            }),
        });
    } catch (error) {
        console.error(error);
        return "Falha na requisição";
    }

    if (!response.ok) {
        const data = await response.json().catch(() => null);
        return data?.message ?? data?.error ?? "Falha ao atualizar perfil";
    }

    return "Perfil atualizado com sucesso";
}