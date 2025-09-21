import ErrorPage from './components/ErrorPage';

const NotFoundPage = () => {
    const NotFoundIllustration = () => (
        <div className="relative">
            {/* Magnifying Glass */}
            <div className="relative">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-purple-400">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200">
                        <span className="text-2xl">🔍</span>
                    </div>
                </div>
                <div className="absolute -right-2 -bottom-2 h-1 w-8 rotate-45 transform rounded-full bg-purple-400"></div>
            </div>

            {/* Floating Question Marks */}
            <div className="absolute -top-2 -left-2 animate-bounce text-lg text-purple-300">?</div>
            <div className="absolute -top-4 right-2 animate-bounce text-sm text-pink-300" style={{ animationDelay: '0.5s' }}>
                ?
            </div>
            <div className="absolute -bottom-2 -left-4 animate-bounce text-lg text-red-300" style={{ animationDelay: '1s' }}>
                ?
            </div>

            {/* Sparkles */}
            <div className="absolute top-0 right-0 animate-pulse text-xs text-yellow-400">✨</div>
            <div className="absolute bottom-0 left-0 animate-pulse text-xs text-blue-400" style={{ animationDelay: '0.7s' }}>
                ✨
            </div>
        </div>
    );

    return (
        <ErrorPage
            errorCode="404"
            title="Halaman Tidak Ditemukan"
            description="Oops! Halaman yang Anda cari sepertinya sedang berlibur. Mungkin halaman ini sudah dipindahkan, dihapus, atau Anda salah mengetik URL."
            illustration={<NotFoundIllustration />}
            showBackButton={true}
            showHomeButton={true}
        />
    );
};

export default NotFoundPage;
