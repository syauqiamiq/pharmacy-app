import ErrorPage from './components/ErrorPage';

const ForbiddenPage = () => {
    const ForbiddenIllustration = () => (
        <div className="relative">
            {/* Shield with Lock */}
            <div className="relative">
                <div className="flex h-28 w-24 items-center justify-center rounded-t-full rounded-b-lg bg-gradient-to-b from-orange-400 to-red-500 shadow-lg">
                    <div className="flex h-20 w-16 items-center justify-center rounded-t-full rounded-b-md bg-gradient-to-b from-orange-100 to-orange-200">
                        {/* Lock Icon */}
                        <div className="relative">
                            <div className="mb-1 h-5 w-8 rounded-t-lg border-2 border-orange-600"></div>
                            <div className="flex h-6 w-10 items-center justify-center rounded-md bg-orange-600">
                                <div className="h-2 w-2 rounded-full bg-orange-100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning Signs */}
                <div className="absolute -top-1 -left-3 animate-pulse text-lg text-yellow-500">⚠️</div>
                <div className="absolute -top-2 -right-3 animate-pulse text-sm text-red-500" style={{ animationDelay: '0.5s' }}>
                    🚫
                </div>
            </div>

            {/* Access Denied Text Effect */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform text-xs font-bold tracking-wider text-red-400 opacity-70">
                ACCESS DENIED
            </div>

            {/* Floating Barrier Lines */}
            <div className="absolute top-12 -left-6 h-0.5 w-4 rotate-45 transform animate-pulse bg-red-400"></div>
            <div
                className="absolute top-12 -right-6 h-0.5 w-4 -rotate-45 transform animate-pulse bg-red-400"
                style={{ animationDelay: '0.3s' }}
            ></div>
            <div
                className="absolute top-16 -left-8 h-0.5 w-4 rotate-45 transform animate-pulse bg-orange-400"
                style={{ animationDelay: '0.6s' }}
            ></div>
            <div
                className="absolute top-16 -right-8 h-0.5 w-4 -rotate-45 transform animate-pulse bg-orange-400"
                style={{ animationDelay: '0.9s' }}
            ></div>
        </div>
    );

    return (
        <ErrorPage
            errorCode="403"
            title="Akses Ditolak"
            description="Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Hubungi administrator jika Anda yakin ini adalah kesalahan."
            illustration={<ForbiddenIllustration />}
            showBackButton={true}
            showHomeButton={true}
        />
    );
};

export default ForbiddenPage;
