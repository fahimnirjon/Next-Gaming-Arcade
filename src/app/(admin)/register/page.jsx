import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

export default async function Page() {
  return(
    <section className="bg-dark">
      <form action={async (formData) => {
        "use server";
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");

        if (!name || !email || !password) {
          throw new Error("Please fill all fields.")
        }

        // check if user exist
        const user = await prisma.user.findUnique ({
          where: {
            email: email
          }
        })

        if (user) throw new Error("This user already exists.");

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword
          }
        });

        console.log("New user has been created.");
        redirect("/login");

      }}>

        <label>
          Name
          <input name="name" type="text" className="text-black"></input>
        </label>

        <label>
          Email
          <input name="email" type="email" className="text-black"></input>
        </label>

        <label>
          Password
          <input name="password" type="password" className="text-black"></input>
        </label>

        <button>Register</button>
      </form>
    </section>
  )
}