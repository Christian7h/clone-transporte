// src/pages/api/delete-service.ts
import { db, CustomDataTable } from 'astro:db';
import { eq } from 'drizzle-orm';

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const serviceId = formData.get("serviceId");

  if (!serviceId) {
    return new Response(JSON.stringify({ message: 'Service ID is required' }), { status: 400 });
  }

  try {
    await db.delete(CustomDataTable).where(eq(CustomDataTable.id, serviceId));
    return new Response(JSON.stringify({ message: 'Servicio eliminado correctamente' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error al eliminar el servicio' }), { status: 500 });
  }
}
