import { BasicButton } from '@/lib/components/atoms/button';
import { FormInput, PasswordInput } from '@/lib/components/atoms/input';
import { ExperimentOutlined, HeartOutlined, LockOutlined, MedicineBoxOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { router, usePage } from '@inertiajs/react';
import { Alert, message } from 'antd';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from './constants/formSchema';

const defaultValues = {
    email: '',
    password: '',
};

const LoginPage = () => {
    const props = usePage().props;
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        router.post('/login', {
            email: data.email,
            password: data.password,
        });
    };
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (props.errors && props.errors.message) {
            messageApi.open({
                type: 'error',
                content: props.errors.message,
                duration: 2,
            });
        }
    }, [props.errors, messageApi]);

    return (
        <>
            {contextHolder}
            <Alert
                banner
                message="UI ini dibuat dengan AI untuk mempercepat proses development - Muhammad Syauqi Amiq Amrullah"
                type="info"
                showIcon
            />
            {/* Main Container with Gradient Background */}
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-500 p-5">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-5">
                    {/* Left Side - Illustration & Branding (Hidden on mobile) */}
                    <div className="hidden flex-col items-center justify-center space-y-8 text-white md:col-span-3 md:flex">
                        {/* Medical Icons with Animation */}
                        <div className="flex flex-wrap justify-center gap-5">
                            <div className="bg-opacity-20 animate-bounce rounded-full bg-white p-5 backdrop-blur-sm">
                                <MedicineBoxOutlined className="text-5xl text-white" />
                            </div>
                            <div
                                className="bg-opacity-20 animate-bounce rounded-full bg-white p-5 backdrop-blur-sm"
                                style={{ animationDelay: '0.5s' }}
                            >
                                <HeartOutlined className="text-5xl text-white" />
                            </div>
                            <div className="bg-opacity-20 animate-bounce rounded-full bg-white p-5 backdrop-blur-sm" style={{ animationDelay: '1s' }}>
                                <SafetyOutlined className="text-5xl text-white" />
                            </div>
                        </div>

                        {/* Branding Text */}
                        <div className="text-center">
                            <h1 className="mb-4 text-4xl font-bold drop-shadow-lg lg:text-6xl">Pharmacy App</h1>
                            <p className="text-opacity-90 text-lg font-light text-white lg:text-xl">Sistem Manajemen Farmasi Modern</p>
                        </div>

                        {/* Feature Highlights */}
                        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                            <div className="text-center">
                                <ExperimentOutlined className="mb-2 block text-2xl lg:text-3xl" />
                                <span className="block text-sm lg:text-base">Resep Digital</span>
                            </div>
                            <div className="text-center">
                                <UserOutlined className="mb-2 block text-2xl lg:text-3xl" />
                                <span className="block text-sm lg:text-base">Manajemen Pasien</span>
                            </div>
                            <div className="text-center">
                                <LockOutlined className="mb-2 block text-2xl lg:text-3xl" />
                                <span className="block text-sm lg:text-base">Keamanan Tinggi</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="col-span-1 mx-auto w-full max-w-md md:col-span-2">
                        <div className="bg-opacity-95 overflow-hidden rounded-3xl border-0 bg-white shadow-2xl backdrop-blur-xl">
                            <div className="p-6 lg:p-8">
                                {/* Mobile Header (Shown only on mobile) */}
                                <div className="mb-8 text-center md:hidden">
                                    <div className="mb-4 text-5xl">
                                        <MedicineBoxOutlined className="text-indigo-600" />
                                    </div>
                                    <h2 className="mb-2 text-2xl font-semibold text-indigo-600">Pharmacy App</h2>
                                    <p className="text-gray-500">Selamat datang kembali</p>
                                </div>

                                {/* Desktop Header */}
                                <div className="mb-8 hidden text-center md:block">
                                    <h2 className="mb-2 text-2xl font-semibold text-indigo-600">Masuk ke Akun Anda</h2>
                                    <p className="text-gray-500">Silakan masukkan kredensial Anda</p>
                                </div>
                                <Alert
                                    message={
                                        <div>
                                            <p className="font-semibold">Akun Dokter</p>
                                            <p>Email: doctor@dev.com</p>
                                            <p>Password: doctor123123</p>
                                        </div>
                                    }
                                    showIcon
                                    type="info"
                                    className="!mb-4"
                                />
                                <Alert
                                    message={
                                        <div>
                                            <p className="font-semibold">Akun Apoteker</p>
                                            <p>Email: pharmacist@dev.com</p>
                                            <p>Password: pharmacist123123</p>
                                        </div>
                                    }
                                    showIcon
                                    type="success"
                                    className="!mb-4"
                                />
                                <Alert
                                    message={
                                        <div>
                                            <p className="font-semibold">Akun Admin</p>
                                            <p>Email: admin@dev.com</p>
                                            <p>Password: admin123123</p>
                                        </div>
                                    }
                                    showIcon
                                    type="warning"
                                    className="!mb-4"
                                />

                                {/* Login Form */}
                                <FormProvider {...methods}>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                        {/* Email Input */}
                                        <div>
                                            <FormInput size="middle" name="email" title="email" label="Email" className="w-full" />
                                        </div>

                                        {/* Password Input */}
                                        <div>
                                            <PasswordInput size="middle" name="password" title="password" label="Password" className="w-full" />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-4">
                                            <div className="flex w-full justify-center">
                                                <BasicButton
                                                    className="w-full"
                                                    title="Masuk ke Sistem"
                                                    size="middle"
                                                    variant="contained"
                                                    type="submit"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </FormProvider>

                                {/* Footer */}
                                <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                                    <p className="text-sm text-gray-500">
                                        © 2025 Pharmacy App. Dibuat dengan ❤️ oleh Muhammad Syauqi Amiq Amrullah S.Kom.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles for Enhanced UI */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0,0,0);
                    }
                    40%, 43% {
                        transform: translate3d(0, -15px, 0);
                    }
                    70% {
                        transform: translate3d(0, -7px, 0);
                    }
                    90% {
                        transform: translate3d(0, -2px, 0);
                    }
                }
                
                .animate-bounce {
                    animation: bounce 2s infinite;
                }
                

            
                `,
                }}
            />
        </>
    );
};

export default LoginPage;
