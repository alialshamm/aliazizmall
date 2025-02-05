import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// إحداثيات عزيز مول (تغييرها للإحداثيات الحقيقية)
const MALL_COORDS = {
    lat: 24.7136,
    lng: 46.6753,
    radius: 100 // نصف القطر بالمتر
};

const GeoLocationCheck = ({ children }: { children: React.ReactNode }) => {
    const [isInsideMall, setIsInsideMall] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    const distance = calculateDistance(
                        userLat, userLng,
                        MALL_COORDS.lat, MALL_COORDS.lng
                    );

                    setIsInsideMall(distance <= MALL_COORDS.radius);

                    // إذا كان المستخدم خارج المول، قم بإعادة توجيهه إلى الصفحة الرئيسية
                    if (distance > MALL_COORDS.radius) {
                        navigate('/');
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsInsideMall(false);
                    navigate('/');
                }
            );
        } else {
            setIsInsideMall(false);
            navigate('/');
        }
    }, [navigate]);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        // حساب المسافة باستخدام Haversine formula
        const R = 6371e3; // متر
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    if (isInsideMall === null) {
        return <div>جاري التحقق من الموقع...</div>; // رسالة تحميل
    }

    if (!isInsideMall) {
        return <div>الخدمة متوفرة فقط داخل عزيز مول.</div>; // رسالة إذا كان المستخدم خارج المول
    }

    return <>{children}</>;
};

export default GeoLocationCheck;