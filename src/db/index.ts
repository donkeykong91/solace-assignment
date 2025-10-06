import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    return {
      select: () => ({
        from: () => [],
      }),
    };
  }

    // for query purposes
    const queryClient = postgres(process.env.DATABASE_URL);
    const db = drizzle(queryClient);
    return db;
};

// const globalForDb = globalThis as unknown as {
//     pg?: ReturnType<typeof postgres>;
//     db?: ReturnType<typeof drizzle<typeof schema>>;
// };

// export const pg =
//     globalForDb.pg ??
//     postgres(process.env.DATABASE_URL as string, {
//         max: 10,
//         idle_timeout: 20,
//         prepare: false,
//     });

// export const db =
//     globalForDb.db ?? drizzle(pg, { schema });
//
// if (!globalForDb.pg) globalForDb.pg = pg;
// if (!globalForDb.db) globalForDb.db = db;

export default setup;