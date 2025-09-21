import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import { Button, Typography } from 'antd';

interface IErrorPageProps {
    errorCode: '404' | '403';
    title: string;
    description: string;
    illustration: React.ReactNode;
    showBackButton?: boolean;
    showHomeButton?: boolean;
}

const ErrorPage = ({ errorCode, title, description, illustration, showBackButton = true, showHomeButton = true }: IErrorPageProps) => {
    const handleGoHome = () => {
        router.visit('/dashboard');
    };

    const handleGoBack = () => {
        window.history.back();
    };

    const getGradientClass = () => {
        return errorCode === '404' ? 'from-purple-400 via-pink-500 to-red-500' : 'from-orange-400 via-red-500 to-pink-500';
    };

    const getErrorCodeColorClass = () => {
        return errorCode === '404' ? 'text-purple-600' : 'text-orange-600';
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg text-center">
                {/* Gradient Background Circle */}
                <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-r ${getGradientClass()} animate-pulse rounded-full opacity-20 blur-3xl`}></div>
                    <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-white p-8 shadow-2xl">
                        {illustration}
                    </div>
                </div>

                {/* Error Code */}
                <div className="mb-6">
                    <Typography className={`text-8xl font-black sm:text-9xl ${getErrorCodeColorClass()} mb-2 tracking-tight`}>{errorCode}</Typography>
                    <div className={`h-1 w-24 bg-gradient-to-r ${getGradientClass()} mx-auto rounded-full`}></div>
                </div>

                {/* Title */}
                <Typography className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl">{title}</Typography>

                {/* Description */}
                <Typography className="mx-auto mb-8 max-w-md leading-relaxed text-gray-600">{description}</Typography>

                {/* Action Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {showHomeButton && (
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleGoHome}
                            className="w-full min-w-[140px] transform border-none bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl sm:w-auto"
                        >
                            <HomeOutlined className="mr-2" />
                            Kembali ke Dashboard
                        </Button>
                    )}

                    {showBackButton && (
                        <Button
                            type="default"
                            size="large"
                            onClick={handleGoBack}
                            className="w-full min-w-[140px] transform border-gray-300 text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:text-gray-800 hover:shadow-xl sm:w-auto"
                        >
                            <ArrowLeftOutlined className="mr-2" />
                            Kembali
                        </Button>
                    )}
                </div>

                {/* Floating Elements */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
                    <div className="absolute top-20 left-10 h-4 w-4 animate-bounce rounded-full bg-blue-400 opacity-60"></div>
                    <div
                        className="absolute top-40 right-20 h-3 w-3 animate-bounce rounded-full bg-purple-400 opacity-60"
                        style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                        className="absolute bottom-40 left-20 h-2 w-2 animate-bounce rounded-full bg-pink-400 opacity-60"
                        style={{ animationDelay: '1s' }}
                    ></div>
                    <div
                        className="absolute right-10 bottom-20 h-3 w-3 animate-bounce rounded-full bg-cyan-400 opacity-60"
                        style={{ animationDelay: '1.5s' }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
