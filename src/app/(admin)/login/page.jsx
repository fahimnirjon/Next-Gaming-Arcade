import { signIn, signOut } from "@/app/auth";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const session = await auth();

  return (
    <section className="bg-dark">
      <div className="flex flex-col items-center justify-center px-6 py-24 h-screen mx-auto">
        <Link
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Image
            className="mr-2 h-auto"
            src="/logo.svg"
            width={212}
            height={35}
            alt="NextRivals"
          />
        </Link>

        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
          <div className="p-6 space-y-4 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>

            <form className="flex flex-col gap-4"
              action={async (formData) => {
                "use server";
                let email = formData.get("email");
                let password = formData.get("password");

                try {
                  const result = await signIn("credentials", {
                    redirect: false,
                    //redirectTo: "/dashboard"
                    email: email,
                    password: password,
                  });

                  if (result?.error) {
                    return { error: result.error };
                  }
                } catch (error) {
                  return {
                    error: error.message || "An unknown error occured.",
                  };
                }

                redirect("/dashboard");
              }}
            >

            <div>
              <label htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>  

              <input
                type="email"
                id="email"
                name="email"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
                placeholder="youremail@goeshere.com"
                />
            </div>                

            <div>
              <label htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>  

              <input
                type="password"
                id="password"
                name="password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                focus:ring-primary-600 focus:border-primary-500 block w-full p-2.5"
                placeholder="••••••••"
                />
            </div>   

              <button
                className="w-full text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* <div className="mb-4 mt-10">{JSON.stringify(session?.user)}</div> */}

      {/* <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form> */}

      {/* <form
        action={async (formData) => {
          "use server";
          let email = formData.get("email");
          let password = formData.get("password");

          try {
            const result = await signIn("credentials", {
              redirect: false,
              //redirectTo: "/dashboard"
              email: email,
              password: password,
            });

            if (result?.error) {
              return { error: result.error };
            }
          } catch (error) {
            return { error: error.message || "An unknown error occured." };
          }

          redirect("/dashboard");
        }}
      >
        <label>
          Email
          <input name="email" type="email" className="text-black" />
        </label>
        <label>
          Password
          <input name="password" type="text" className="text-black" />
        </label>
        <button>Sign In</button>
      </form> */}
    </section>
  );
}
