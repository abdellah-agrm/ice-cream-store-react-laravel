import { Github, Instagram, Linkedin, Twitter, Youtube } from "react-bootstrap-icons"

export default function Footer() {
  const icons = [
    {
      icon: <Twitter className="h-5 w-auto text-cream-200" />,
      link: "https://twitter.com"
    },
    {
      icon: <Instagram className="h-5 w-auto text-cream-200" />,
      link: "https://instagram.com"
    },
    {
      icon: <Youtube className="h-5 w-auto text-cream-200" />,
      link: "https://youtube.com"
    },
    {
      icon: <Linkedin className="h-5 w-auto text-cream-200" />,
      link: "https://linkedin.com/in/abdellah-agourram"
    },
    {
      icon: <Github className="h-5 w-auto text-cream-200" />,
      link: "https://github.com/abdellah-agrm"
    },
  ];

  return (
    <footer className="bg-cream-200">
      <div className="container px-5 py-8 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a href="#_" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <h1 className="text-4xl text-center font-black font-dmserif text-gray-800">IceCream</h1>
          </a>
          <p className="m-0 text-sm text-cream-600">Online Ice Cream Shop</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="lg:w-1/3 md:w-1/2 w-full px-4">
                <h2 className="title-font font-bold text-cream-600 tracking-widest text-base mb-1">CATEGORIES</h2>
                <nav className="list-none font-medium mb-10">
                  <li><a href="#_" className="text-gray-600 hover:text-gray-800">Home</a></li>
                  <li><a href="#_" className="text-gray-600 hover:text-gray-800">Our products</a></li>
                  <li><a href="#_" className="text-gray-600 hover:text-gray-800">Our story</a></li>
                  <li><a href="#_" className="text-gray-600 hover:text-gray-800">Contact us</a></li>
                </nav>
              </div>
            ))
          }
        </div>
      </div>
      <div className="border-t-[1px] border-cream-600 mx-6">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-cream-600 text-base text-center sm:text-left">© {new Date().getFullYear()} IceCream -
            <a href="https://github.com/abdellah-agrm" rel="noopener noreferrer" className="text-cream-600 ml-1" target="_blank">Abdellah Agourram</a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center gap-1 sm:justify-start">
            {
              icons.map((item, index) => (
                <a key={index} className="flex justify-center items-center rounded-md h-7 w-7 bg-cream-600" href={item.link}>{item.icon}</a>
              ))
            }
          </span>
        </div>
      </div>
    </footer>
  )
}