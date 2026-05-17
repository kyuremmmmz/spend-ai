import { signOut } from "@/features/auth/actions/authentication";
import DashboardPage from "@/features/dashboard/components/DashboardPage";
import { getUserData } from "@/shared/lib/dal";

export default async function page() {
    const getUser = await getUserData();
    return <DashboardPage userName={getUser?.name} signOut={async () => {
        "use server"
        await signOut()
    }}/>
}