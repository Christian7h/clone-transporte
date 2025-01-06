import type { APIContext } from "astro";
import { db,User,CustomDataTable,Session } from "astro:db";
import { lucia } from "../../auth";

export async function POST(context: APIContext): Promise<Response> {
  // Verificar la sesión
  const sessionCookie = context.cookies.get(lucia.sessionCookieName);
  const session = sessionCookie
    ? await lucia.validateSession(sessionCookie.value)
    : null;

  if (!session) {
    return new Response("No autorizado", { status: 401 });
  }

  // Procesar los datos enviados desde el formulario
  const formData = await context.request.formData();
  const customTitle = formData.get("customTitle");
  const customDescription = formData.get("customDescription");
  const customIcon = formData.get("customIcon");


  // Inserción en la base de datos
  try {
    await db
      .insert(CustomDataTable)
      .values([
        {
          id: crypto.randomUUID().toString(), // Asegurar que sea una cadena
          userId: session.user?.id, // Asegurar que userId es una cadena
          title: customTitle ? String(customTitle) : "", // Convertir a cadena
          description: customDescription ? String(customDescription) : "", // Convertir a cadena
          icon: customIcon ? String(customIcon) : "", // Convertir a cadena
        },
      ])
      .execute();

      return new Response(JSON.stringify({ message: 'Servicio añadido correctamente' }), { status: 200 });
    } catch (error) {
    console.error("Error al insertar datos:", error);
    return new Response("Error al enviar los datos", { status: 500 });
  }
}
