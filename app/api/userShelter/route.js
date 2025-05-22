import { getUserShelter } from "@/lib/getUserShelter";

export async function GET() {
    const userShelter = await getUserShelter();
    if (!userShelter) {
        return Response.json(
            { error: 'Shelter doesnt exist' },
            { status: 401 }
        )
    }
    return Response.json({ userShelter });
}