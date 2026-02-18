import React, { useEffect, useState } from 'react';
import { getVisitorCount, incrementVisitorCount } from '../services/visitorService';
import { Box, Typography, Paper } from '@mui/material';

const VisitorCounter = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const initCount = async () => {
            // Increment count on initial load
            const newCount = await incrementVisitorCount();
            setCount(newCount);
        };

        initCount();
    }, []);

    if (count === null) {
        return null; // Or a loading spinner
    }

    return (
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            <Paper elevation={3} sx={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: '20px' }}>
                <Typography variant="body2" component="div">
                    Visitor Count: <strong>{count}</strong>
                </Typography>
            </Paper>
        </Box>
    );
};

export default VisitorCounter;
