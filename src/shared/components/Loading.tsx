import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Props{
    state: 'loading' | 'success' | 'error';
}

export default function Loading({ state }: Props) { 
    return <Spinner aria-label="Loading" role={state} className={cn("flex items-center justify-center animate-spin", "h-5", "w-5")} />
}