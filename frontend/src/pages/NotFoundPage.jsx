import NavbarP from "../components/NavbarP";

const NotFoundPage = () => {
    return (
        <>
            <NavbarP />
            <div className="relative bg-cover bg-center h-screen flex justify-center items-center text-white"
                 style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/11/24/10/43/ticket-2974645_1280.jpg')" }}>
                 
                <div className="absolute inset-0 bg-black opacity-50"></div>
                
                <div className="relative z-10 text-center p-6 max-w-lg mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-wide text-yellow-400 mb-4">
                        Oops! Page Not Found
                    </h1>
                    <p className="text-xl mb-6 text-gray-200">
                        We couldn't find the page you're looking for. Try going back to the homepage or exploring other pages.
                    </p>
                    <a href="/" className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                        Go Back Home
                    </a>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
