import { db, CustomDataTable,User, Session } from 'astro:db';

export default async function() {
  // Insertar datos en la tabla CustomDataTable
  await db .insert(User).values([
	{
	  id: 'zxf1go94r1karxd',
	  email: 'test@test.cl',
	  username: 'test',
	  password: 'test',
	  github_id: null,
	},
	  ]);
	  await db.insert(Session).values([
		{
		  id: 'acujkfmrofdfnup2ugkegr7ctul4yf2tpacgin6x',
		  userId: 'zxf1go94r1karxd',
		  expiresAt: 1738693703,
		},
		  ]);
  await db.insert(CustomDataTable).values([
    {
      id: 'e7b18aba-1f69-4a57-b6c3-b4412d3e2743',  // ID único para el servicio
      userId: 'zxf1go94r1karxd',  // ID del usuario (puedes ajustar esto si es diferente en tu esquema)
      title: 'Transporte',  // Título del servicio
      description: 'Transporte de carga en general para particulares, empresas, instituciones públicas y privadas.',  // Descripción del servicio
      icon: 'bi bi-truck'  // Ícono asociado al servicio (en este caso, un icono de camión de Bootstrap)
    },
	{
		id: 'e7b18aba-1f69-4a57-b6c3-b4n544412d3e27343G43',  // ID único para el servicio
		userId: 'zxf1go94r1karxd',  // ID del usuario (puedes ajustar esto si es diferente en tu esquema)
		title: 'Transporte',  // Título del servicio
		description: 'Transporte de carga en general para particulares, empresas, instituciones públicas y privadas.',  // Descripción del servicio
		icon: 'bi bi-truck'  // Ícono asociado al servicio (en este caso, un icono de camión de Bootstrap)
	  },
	  {
		"id": "e7b18aba-1f69-4a57-ern54b6c3-b4412d3e27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Reparto de Paquetería",  
		"description": "Servicio de distribución de paquetes y documentos a nivel local, regional y nacional, con seguimiento en tiempo real.",  
		"icon": "bi bi-box"  
	  },
	  {
		"id": "e7b18aba-1f69-ern54n4a57-b6c3-b4412d3e27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Transporte Especializado",  
		"description": "Transporte de materiales y equipos especiales que requieren condiciones particulares, como mercancías peligrosas o de alto valor.",  
		"icon": "bi bi-archive"  
	  },
	  {
		"id": "e7b18aba-1f69-4a57-ernr35nb6c3-b4412d3e27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Alquiler de Vehículos",  
		"description": "Alquiler de vehículos comerciales y particulares, incluyendo camiones, furgonetas y autos, con opciones de conductor o solo alquiler de vehículo.",  
		"icon": "bi bi-car-front"  
	  },
	  {
		"id": "e7b18aba-1f634berb9-4a57-b6c3-b4412d3e27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Logística de Eventos",  
		"description": "Planificación y coordinación de transporte de equipos y materiales para eventos, congresos y ferias, incluyendo traslado de personal y asistencia logística.",  
		"icon": "bi bi-calendar-event"  
	  },
	  {
		"id": "e7b18aba-1f69-4a57erbrtebr-b6c3-b4412d3e27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Transporte Refrigerado",  
		"description": "Transporte de productos perecederos que requieren condiciones de temperatura controlada, como alimentos, medicinas y productos químicos.",  
		"icon": "bi bi-snow"  
	  },
	  {
		"id": "e7b18aba-1f69-4a57-b6c3-b4412d3eb4etresr27343G43",  
		"userId": "zxf1go94r1karxd",  
		"title": "Distribución Mayorista",  
		"description": "Distribución de productos al por mayor a comercios y empresas, con un servicio de transporte adaptado a la logística mayorista y a la distribución eficiente.",  
		"icon": "bi bi-basket"  
	  },

  ]);

}
