export const Slide = ({ image, bgcolor }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-[250px] w-[250px] sm:h-[280px] sm:w-[280px] md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px] rounded-full" style={{backgroundColor: bgcolor}}>
      <img src={image} alt="Product" className="pt-8 md:pt-16 h-full w-auto object-center object-cover mb-4" />
    </div>
  );
};
