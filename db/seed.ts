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
		id: 'e7b18aba-1f69-4a57-b6c3-b4412d3e27343G43',  // ID único para el servicio
		userId: 'zxf1go94r1karxd',  // ID del usuario (puedes ajustar esto si es diferente en tu esquema)
		title: 'Transporte',  // Título del servicio
		description: 'Transporte de carga en general para particulares, empresas, instituciones públicas y privadas.',  // Descripción del servicio
		icon: 'bi bi-truck'  // Ícono asociado al servicio (en este caso, un icono de camión de Bootstrap)
	  },
  ]);

}
