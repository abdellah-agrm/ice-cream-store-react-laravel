import { Box2Heart, Truck } from "react-bootstrap-icons";

export default function Qualities() {
  const allqualities = [
    {
      icon: <img className="h-auto w-14" src="/images/icecream/IceCream.svg" alt="icon" />,
      title: "Wide Variety of Flavors",
      txt: "Your online shop offers a diverse and extensive range of ice cream flavors to cater to different tastes and preferences. From classic favorites like vanilla and chocolate to unique and innovative flavors like salted caramel pretzel or lavender honey, customers can explore a wide spectrum of delightful options."
    }, {
      icon: <Truck className="w-10 h-10" />,
      title: "Efficient Home Delivery",
      txt: "Experience the convenience of having your favorite ice cream delivered right to your doorstep with our efficient home delivery service. We take pride in ensuring that your orders are handled with care, maintaining the perfect temperature to preserve the quality of our ice cream during transit."
    }, {
      icon: <Box2Heart className="w-10 h-10" />,
      title: "Sustainable Packaging",
      txt: "We are committed to not only delighting your taste buds but also caring for the environment. Our ice cream comes in eco-friendly and sustainable packaging, minimizing our ecological footprint. Enjoy guilt-free indulgence knowing that your delightful treat is not only delicious but also packaged with the planet in mind."
    }
  ];


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="text-center mb-14">
          <h1 className="sm:text-4xl text-2xl font-medium title-font text-gray-900 mb-4">Our Signature <span className="text-cream-600">Qualities</span></h1>
          <p className="text-lg leading-relaxed mx-auto text-gray-500s">
            Explore the essence of quality and creativity as we present three defining qualities that <br /> make Ice Cream a sweet haven for ice cream enthusiasts
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-cream-600 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {
            allqualities.map((item, index) => (
              <div key={index} className="p-4 md:w-1/3 flex flex-col text-center items-center">
                <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-cream-600 mb-5 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{item.title}</h2>
                  <p className="leading-relaxed text-base">{item.txt}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}