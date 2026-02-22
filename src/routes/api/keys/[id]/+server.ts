import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        await prisma.apiKey.delete({
            where: { id: params.id }
        });
        return json({ success: true });
    } catch (error) {
        console.error('Failed to delete key:', error);
        return json({ error: 'Failed to delete key' }, { status: 500 });
    }
};

export const PUT: RequestHandler = async ({ params, request }) => {
    try {
        const data = await request.json();
        const updatedKey = await prisma.apiKey.update({
            where: { id: params.id },
            data
        });
        return json(updatedKey);
    } catch (error) {
        console.error('Failed to update key:', error);
        return json({ error: 'Failed to update key' }, { status: 500 });
    }
};
