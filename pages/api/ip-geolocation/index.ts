// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs';
import axios from 'axios';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    res.status(200).json(data);
}

export default withSentry(handler);
