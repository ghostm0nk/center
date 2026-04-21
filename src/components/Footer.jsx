function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8 mt-8">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Center. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;