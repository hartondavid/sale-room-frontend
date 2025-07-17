import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { getImageUrl, isApiUrlConfigured, getImageDebugMessage } from '../utils/imageUtils';

const ImageDebug = ({ imagePath }) => {
    const [debugInfo, setDebugInfo] = useState({});
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        const info = {
            apiUrl: process.env.REACT_APP_API_URL,
            isConfigured: isApiUrlConfigured(),
            fullImageUrl: getImageUrl(imagePath),
            originalPath: imagePath,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
        setDebugInfo(info);
    }, [imagePath]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
    };

    if (!showDebug) {
        return (
            <Button
                size="small"
                onClick={() => setShowDebug(true)}
                sx={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
            >
                Debug
            </Button>
        );
    }

    return (
        <Paper
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
                p: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                overflow: 'auto'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Image Debug Info</Typography>
                <Button size="small" onClick={() => setShowDebug(false)}>Close</Button>
            </Box>

            <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>API URL:</strong> {debugInfo.apiUrl || 'NOT SET'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>API URL Configured:</strong> {debugInfo.isConfigured ? 'Yes' : 'No'}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Original Path:</strong> {debugInfo.originalPath}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Full Image URL:</strong> {debugInfo.fullImageUrl}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>User Agent:</strong> {debugInfo.userAgent}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Timestamp:</strong> {debugInfo.timestamp}
            </Typography>

            <Button variant="contained" onClick={copyToClipboard} sx={{ mr: 1 }}>
                Copy Debug Info
            </Button>

            <Button
                variant="outlined"
                onClick={() => window.open(debugInfo.fullImageUrl, '_blank')}
                disabled={!debugInfo.fullImageUrl || debugInfo.fullImageUrl === '/no-image.svg'}
            >
                Test Image URL
            </Button>
        </Paper>
    );
};

export default ImageDebug; 