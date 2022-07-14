import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/SupabaseConnector';
import jwt from 'jsonwebtoken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userAddress = req.query.account;

    const token = jwt.sign({ metamaskAddress: userAddress }, process.env.JWT_SECRET || '');
    supabase.auth.setAuth(token);

    try {
        const { data } = await supabase
            .from('users')
            .select('phone_verified')
            .eq('address', userAddress)
            .single();

        return res.status(200).json({ isPhoneVerified: data?.phone_verified });
    } catch (error) {
        return res.status(400).json({ error });
    }
}