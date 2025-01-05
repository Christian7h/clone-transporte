import { lucia } from "../../auth";
import type { APIContext } from "astro";
import { db, eq, or, User } from "astro:db";
import { Argon2id } from "oslo/password";

export async function POST(context: APIContext): Promise<Response> {
  // Read the form data
  const formData = await context.request.formData();
  const identifier = formData.get("username"); // Can be username or email
  const password = formData.get("password");

  // Validate the data
  if (typeof identifier !== "string" || identifier.trim() === "") {
    return new Response("Invalid username or email", {
      status: 400,
    });
  }

  if (typeof password !== "string" || password.trim() === "") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  // Search the user by username or email
  const foundUser = (
    await db
      .select()
      .from(User)
      .where(or(eq(User.username, identifier), eq(User.email, identifier)))
  ).at(0);

  // If user not found
  if (!foundUser) {
    return new Response("Incorrect username/email or password", { status: 400 });
  }

  // Verify if user has password
  if (!foundUser.password) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  // Verify the password
  const validPassword = await new Argon2id().verify(foundUser.password, password);

  // If password is not valid
  if (!validPassword) {
    return new Response("Incorrect username/email or password", { status: 400 });
  }

  // Password is valid, user can log in
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return context.redirect("/");
}
