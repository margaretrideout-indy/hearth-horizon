import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        base44.auth.me()
            .then(() => navigate('/hearth', { replace: true }))
            .catch(() => navigate('/', { replace: true }));
    }, []);

    return null;
}