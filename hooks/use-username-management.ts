import { useState } from 'react';

export interface UsernameCheckResult {
    available: boolean;
    username?: string;
    reason?: string;
    error?: string;
}

export interface UsernameUpdateResult {
    success: boolean;
    username?: string;
    vanityUrl?: string;
    canonicalUrl?: string;
    merchantSlug?: string;
    error?: string;
}

export function useUsernameManagement() {
    const [isChecking, setIsChecking] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [checkResult, setCheckResult] = useState<UsernameCheckResult | null>(null);

    const checkAvailability = async (username: string): Promise<UsernameCheckResult> => {
        setIsChecking(true);
        try {
            const response = await fetch(
                `/api/merchants/username?username=${encodeURIComponent(username)}`
            );
            const data: UsernameCheckResult = await response.json();
            setCheckResult(data);
            return data;
        } catch (error) {
            const errorResult: UsernameCheckResult = {
                available: false,
                error: 'Failed to check username availability',
            };
            setCheckResult(errorResult);
            return errorResult;
        } finally {
            setIsChecking(false);
        }
    };

    const updateUsername = async (
        username: string,
        merchantId: string
    ): Promise<UsernameUpdateResult> => {
        setIsUpdating(true);
        try {
            const response = await fetch('/api/merchants/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, merchantId }),
            });

            const data: UsernameUpdateResult = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Failed to update username',
                };
            }

            return data;
        } catch (error) {
            return {
                success: false,
                error: 'Failed to update username',
            };
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        isChecking,
        isUpdating,
        checkResult,
        checkAvailability,
        updateUsername,
    };
}
