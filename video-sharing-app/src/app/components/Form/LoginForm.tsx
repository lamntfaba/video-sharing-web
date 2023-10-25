'use client';
import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/utils/firebaseConfig';
import LoginFormType from '@/types/LoginFormType';

const LoginForm = () => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors: FormikErrors<LoginFormType> = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                createUserWithEmailAndPassword(auth, values.email, values.password)
                    .then(() => {
                        // User account created successfully
                        signInWithEmailAndPassword(auth, values.email, values.password).then(() => window.location.reload());
                        setSubmitting(false);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(`Error: ${errorCode} - ${errorMessage}`);
                        if (errorCode === 'auth/email-already-in-use') {
                            signInWithEmailAndPassword(auth, values.email, values.password).then(() => window.location.reload());
                            setSubmitting(false);
                        }
                    });
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`px-2 py-1 border border-black border-solid mr-1 ${errors.email && touched.email ? 'border-red-600' : ''}`}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`px-2 py-1 border border-black border-solid mr-1 ${errors.password && touched.password ? 'border-red-600' : ''}`}
                    />
                    <button type="submit" disabled={isSubmitting || !isValid} className='px-2 py-1 border border-black border-solid text-black disabled:text-gray-800'>
                        Login / Register
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default LoginForm;