import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma';

export const GET: RequestHandler = async () => {
    try {
        const keys = await prisma.apiKey.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return json(keys);
    } catch (error) {
        console.error('Failed to fetch keys:', error);
        return json({ error: 'Failed to fetch keys' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        const newKey = await prisma.apiKey.create({
            data: {
                service: data.service,
                projectName: data.projectName,
                modelName: data.modelName || null,
                key: data.key,
                usageLimit: data.usageLimit || null,
                currentUsage: 0
            }
        });
        return json(newKey, { status: 201 });
    } catch (error) {
        console.error('Failed to create key:', error);
        return json({ error: 'Failed to create key' }, { status: 500 });
    }
};
