"use server"

export async function login(formData: FormData) {
    const email = formData.get("email");
    const senha = formData.get("senha");

    const response = await fetch(`${process.env.API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            senha,
        }),
    });

    const data = await response.json();

    console.log(data);
}