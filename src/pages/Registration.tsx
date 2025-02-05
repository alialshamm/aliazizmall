import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Registration.module.css'

type FormData = {
    name: string;
    mobile: string;
    email: string;
    city: string;
};

const Registration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = (data: FormData) => {
        localStorage.setItem('registrationData', JSON.stringify(data));
        navigate('/confirmation');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>تسجيل البيانات</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>الاسم الكامل</label>
                    <input
                        {...register('name', { required: 'مطلوب' })}
                        type="text"
                        className={styles.input}
                    />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>رقم الجوال</label>
                    <input
                        {...register('mobile', {
                            required: 'مطلوب',
                            pattern: /^05\d{8}$/
                        })}
                        type="tel"
                        className={styles.input}
                    />
                    {errors.mobile && <span className={styles.error}>رقم غير صحيح</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>البريد الإلكتروني</label>
                    <input
                        {...register('email', {
                            required: 'مطلوب',
                            pattern: /^\S+@\S+$/i
                        })}
                        type="email"
                        className={styles.input}
                    />
                    {errors.email && <span className={styles.error}>بريد غير صحيح</span>}
                </div>

                <div className={styles.formGroup}>
                    <label>المدينة/الدولة</label>
                    <input
                        {...register('city', { required: 'مطلوب' })}
                        type="text"
                        className={styles.input}
                    />
                    {errors.city && <span className={styles.error}>{errors.city.message}</span>}
                </div>

                <button type="submit" className={styles.button}>تسجيل</button>
            </form>
        </div>
    );
};

export default Registration;