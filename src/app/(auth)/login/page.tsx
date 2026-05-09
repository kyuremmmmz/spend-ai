import AuthPageClient from "@/features/auth/components/AuthPageClient";

export default async function page({ params }: { params: string }) {
    const slug = await params;
    return <AuthPageClient path={slug} />
}