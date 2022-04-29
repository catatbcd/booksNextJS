import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Admin({children}) {
    const router = useRouter();
  const { data: session , status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/books");
    },
  })

  if (status === "loading") {
    return "Loading or not authenticated..."
  }
 if(session.user.roles === "admin")
 return children;
  if(session.user.roles === "user")
  router.replace("/books");
}