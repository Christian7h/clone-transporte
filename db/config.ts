// db/config.ts
import { column, defineDb, defineTable } from "astro:db";
  
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    email:column.text({ unique: true }),
    username: column.text({ unique: true }),
    password: column.text({ optional: true}),
    github_id: column.text({ optional: true, unique: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false,unique: true }),
    userId: column.text({ references: () => User.columns.id, optional: false }),
    expiresAt: column.number({ optional: false }),
    
  },
});
const CustomDataTable = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    userId: column.text({ references: () => User.columns.id }),
    title: column.text(),          // Título del servicio
    description: column.text(),    // Descripción del servicio
    icon: column.text(),           // Nombre del ícono (e.g., "bi bi-truck")
  },
});


export default defineDb({
  tables: {
    User,
    Session,
    CustomDataTable,
  },
});
