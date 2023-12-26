
export default function ContactUs() {
  return (
    <section className="text-gray-900 font-poppins pt-4 mb-10" id="contactus">
      <div className="ontainer w-9/12 text-center text-gray-600 mx-auto mb-10">
        <h1 className="sm:text-4xl text-2xl font-semibold title-font text-gray-900 mb-4">Need Assistance? <span className="text-cream-600">Contact Us</span></h1>
        <p className="text-lg md:w-9/12 leading-relaxed mx-auto text-gray-500s">
          We're here to assist you with any questions, feedback, or inquiries you may have, Feel free to reach out to us.
        </p>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-cream-600 inline-flex"></div>
        </div>
      </div>

      <div className="mx-auto relative w-[80%]">
        <div className="absolute inset-0 bg-cream-300 rounded border border-cream-400">
          <iframe className="w-full h-full" style={{ filter: 'contrast(1.2) opacity(0.5)' }}
            src="https://maps.google.com/maps?width=100%25&amp;height=500&amp;hl=en&amp;q=GCWM+297,%20Casablanca%2020670+(Ice%20cream)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.maps.ie/population/">Calculate population in area</a>
          </iframe>
        </div>
        <div className="container px-5 py-10 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-cream-100/30 backdrop-blur-sm rounded-lg px-8 py-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg font-semibold title-font">Contact us</h2>
            <div className="relative mb-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-cream-100 rounded border border-cream-400 placeholder:text-cream-400 focus:border-cream-400 focus:ring-0 text-sm outline-none text-gray-900 py-0.5 px-2 leading-8 transition-colors duration-200 ease-in-out" placeholder="name@email.com" />
            </div>
            <div className="relative mb-1">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full bg-cream-100 rounded border border-cream-400 placeholder:text-cream-400 focus:border-cream-400 focus:ring-0 text-sm outline-none text-gray-900 py-0.5 px-2 leading-5 transition-colors duration-200 ease-in-out" placeholder="write your message..."></textarea>
            </div>
            <button className="w-full text-cream-100 bg-cream-500 border-0 py-1.5 px-6 focus:outline-none hover:bg-cream-400 rounded-full text-lg">Submit</button>
          </div>
        </div>
      </div>
    </section>
  )
}