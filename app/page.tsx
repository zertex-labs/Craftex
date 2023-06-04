import { getUsers } from "@/db";
import "../db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const values = await getUsers();
  console.log(values);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>yo {values.length} </h1>
      {values.map((value) => (
        <h1 key={value.id}>{value._fullName}</h1>
      ))}
    </main>
  );
}
