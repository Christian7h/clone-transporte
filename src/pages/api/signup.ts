//src/pages/api/signup.ts
import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db, User,eq,or } from "astro:db";
import { lucia } from "../../auth";

export async function POST(context: APIContext): Promise<Response> {
  //Parse the form data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  // Validate the form data
  if (!username || !email || !password) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error="+encodeURIComponent("All fields are required"),
      },
    });
  }

  if (typeof username !== "string" || username.length < 4) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("El nombre de usuario debe tener al menos 4 caracteres"),
      },
    });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("El correo electrónico no es válido"),
      },
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("La contraseña debe tener al menos 6 caracteres"),
      },
    });;
  }

  // Check if username or email already exists
  const existingUser = await db
    .select()
    .from(User)
    .where(or(eq(User.username, username), eq(User.email, email)))
    .execute();

  if (existingUser.length > 0) {
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/signup?error=" + encodeURIComponent("El nombre de usuario o correo electrónico ya existe"),
      },
    });
  }
  // Insert user into db
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  await db.insert(User).values([
    {
      id: userId,
      email,
      username,
      password: hashedPassword,
    },
  ]);

  // Generate session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/dashboard");
}