

const Footer = () => {
    return (
        <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800 ">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-md leading-relaxed text-gray-400 md:text-left">
            Built by{" "}
            <a
              href="https://github.com/burakorkmez"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-400 hover:underline hover:text-blue-500 underline-offset-4"
            >
              you
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/burakorkmez"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-400 hover:underline hover:text-blue-500 underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
      
    );
  };
  
  export default Footer;