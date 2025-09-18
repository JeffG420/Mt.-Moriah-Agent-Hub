import { useState, useEffect, useCallback } from 'react';

export type NotificationPermissionStatus = 'granted' | 'denied' | 'default';

/**
 * A custom hook to manage browser push notifications.
 * It handles permission requests and provides a function to display notifications.
 */
export const useNotifications = () => {
    const [permission, setPermission] = useState<NotificationPermissionStatus>('default');

    // On mount, check the current notification permission status.
    useEffect(() => {
        if ('Notification' in window) {
            setPermission(Notification.permission as NotificationPermissionStatus);
        }
    }, []);

    /**
     * Requests permission from the user to show notifications.
     * This should be called based on a user interaction, like a button click.
     */
    const requestPermission = useCallback(async () => {
        // Only request if the permission is not yet granted or denied.
        if ('Notification' in window && Notification.permission === 'default') {
            const result = await Notification.requestPermission();
            setPermission(result as NotificationPermissionStatus);
        }
    }, []);

    /**
     * Displays a notification if permission has been granted.
     * @param title - The title of the notification.
     * @param options - Standard Notification API options (body, icon, etc.).
     */
    const showNotification = useCallback((title: string, options?: NotificationOptions) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, options);
            
            // When the notification is clicked, focus the application's window.
            notification.onclick = () => {
                window.focus();
            };
        }
    }, []);

    return { permission, requestPermission, showNotification };
};
