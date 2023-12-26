import { Link } from "react-router-dom"
import { Chat, Eye } from "react-bootstrap-icons"

export default function StoryAroundUs() {

  const data = [
    {
      img: "/images/icecream/icecream_4.jpeg",
      title: "Best Ice Cream In Town",
      txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque augue quis massa posuere pulvinar. Etiam dictum eleifend aliquet. Donec faucibus mattis turpis."
    },
    {
      img: "/images/icecream/icecream_5.png",
      title: "Your Family Ice Cream Shop",
      txt: "Sed quis ligula justo. Aenean risus risus, malesuada non ornare eget, tempor vitae est. Nullam a est rhoncus, rutrum quam at, faucibus velit. Aliquam sit amet pretium tellus."
    },
    {
      img: "/images/icecream/icecream_6.png",
      title: "It's Ice Cream Time",
      txt: "Vestibulum felis lacus, congue ut quam lacinia, viverra sagittis lectus. Cras pulvinar risus in odio faucibus, vel lacinia sem maximus. Donec pulvinar ipsum vel ullamcorper commodo."
    },
  ]

  return (
    <section className="text-gray-600">
      <div className="container w-9/12 py-12 mx-auto">
        <div className="text-center mb-10" id="aboutus">
          <h1 className="sm:text-4xl text-2xl font-medium title-font text-gray-900 mb-4">Story <span className="text-cream-600">Around Us</span></h1>
          <p className="text-lg leading-relaxed mx-auto text-gray-500s">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-cream-600 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap m-4">
          {
            data.map((item, index) => (
              <div key={index} className="p-4 md:w-1/3">
                <div className="h-full bg-cream-200 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={item.img} alt="blog" />
                  <div className="p-4">
                    <h1 className="title-font text-lg font-medium text-cream-600 mb-1">{item.title}</h1>
                    <p className="leading-normal text-gray-800 mb-3">{item.txt}</p>
                    <div className="flex items-center flex-wrap ">
                      <Link to="/readmore" className="group inline-flex items-center justify-center rounded-md text-base font-normal text-cream-500 transition-all duration-200 ease-in-out focus:shadow">
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-2.5 ml-0.5 h-5 w-auto transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <span className="text-gray-800 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <Eye className="w-4 h-4 mr-1" /> 1.2K
                      </span>
                      <span className="text-gray-800 inline-flex items-center leading-none text-sm">
                        <Chat className="w-4 h-4 mr-1" /> 6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </section>
  )
}