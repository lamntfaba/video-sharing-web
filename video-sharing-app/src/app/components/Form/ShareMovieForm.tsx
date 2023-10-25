'use client';
import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors } from 'formik';
import { Context } from '@/context/AuthContext';
import { ref, set } from 'firebase/database';
import { database } from '@/utils/firebaseConfig';
import { useRouter } from 'next/navigation';
import IconSpinner from '../Icons/SpinIcon';
import VideoFormType from '@/types/VideoFormType';
import Alert from '../Common/Alert';
const httpRegex = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
const ShareMovieForm = () => {
    const { user } = useContext(Context);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const router = useRouter();
    const handleCloseAlert = () => {
        setShowAlert(false);
      };
    return (
        <div className='relative mt-40 py-14 pl-5 pr-20 border border-solid border-black rounded-lg' style={{ width: '500px' }}>
            <Alert type="success" message="Success: Your action was successful." showAlert={showAlert} onClose={handleCloseAlert} />
            <h3 className='text-sm absolute -top-3 left-3 bg-white'>Share a Youtube movie</h3>
            <Formik
                initialValues={{ url: '' }}
                validate={values => {
                    const errors: FormikErrors<VideoFormType> = {};
                    if (!values.url) {
                        errors.url = 'Required';
                    } else if (
                        !httpRegex.test(values.url)
                    ) {
                        errors.url = 'Invalid Youtube URL';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (!values.url) {
                        return;
                    }
                    fetch(`https://noembed.com/embed?dataType=json&url=${values.url}`)
                        .then(res => res.json())
                        .then(data => {
                            const videoIds = values.url.match(httpRegex);
                            if (videoIds != null) {
                                const videoId = videoIds[1];
                                set(ref(database, 'videos/' + videoId), {
                                    videoId,
                                    title: data.title,
                                    url: data.url,
                                    createBy: user.email,
                                    likedList: [],
                                    unlikedList: [],
                                }).then(() => {
                                    // router.push('/');
                                    setSubmitting(false);
                                    setShowAlert(true);
                                    resetForm();
                                }).catch((error) => {
                                    
                                });
                            } else {
                                // The URL is invalid
                            }
                        });
                }}
            >
                {({ isSubmitting, isValid }) => (
                    <Form>
                        <div className="flex flex-row">
                            <div className="basis-1/4">
                                <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">Youtube URL:</label>
                            </div>
                            <div className="basis-3/4">
                                <Field type="text" name="url" className='block w-full border-solid border border-black px-1 py-1.5 text-gray-900' />
                                <ErrorMessage className='text-sm text-red-500' name="url" component="div" />
                                <button
                                    type="submit" disabled={isSubmitting || !isValid}
                                    className="w-full mt-4 py-1 text-sm border-solid border justify-center border-black text-black disabled:text-gray-400 inline-flex items-center"
                                >
                                    {isSubmitting && <IconSpinner className="w-6 h-6 animate-spin" />}
                                    Share
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default ShareMovieForm;