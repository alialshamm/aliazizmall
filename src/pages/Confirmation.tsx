import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Confirmation.module.css'

const Confirmation = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('registrationData') || '{}');

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>تم التسجيل بنجاح!</h1>
            <div className={styles.userDetails}>
                <h2>تفاصيل التسجيل:</h2>
                <div className={styles.detailItem}>
                    <span>الاسم:</span>
                    <p>{userData.name}</p>
                </div>
                <div className={styles.detailItem}>
                    <span>الجوال:</span>
                    <p>{userData.mobile}</p>
                </div>
                <div className={styles.detailItem}>
                    <span>البريد الإلكتروني:</span>
                    <p>{userData.email}</p>
                </div>
                <div className={styles.detailItem}>
                    <span>المدينة:</span>
                    <p>{userData.city}</p>
                </div>
            </div>
            <button className={styles.button} onClick={() => navigate('/')}>
                العودة للصفحة الرئيسية
            </button>
        </div>
    );
};

export default Confirmation;