import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/SupabaseConnector';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userAddress = req.query.account;

    try {
        let { data } = await supabase
            .from('users')
            .select('state')
            .eq('address', userAddress)
            .single();

        return res.status(200).json({ userStatus: data?.state });
    } catch (error) {
        return res.status(400).json({ error });
    }
}