import { isUserVerified } from "@/shared/lib/dal";
import { redirect } from "next/navigation";

export  default async function Home() {
  const verifiedUser = await isUserVerified();
  if (!verifiedUser) {
    redirect("/verify-email");
  }
  redirect("/dashboard");
  

}
