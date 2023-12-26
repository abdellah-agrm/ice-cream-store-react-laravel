import { Cart3, CurrencyDollar, SuitHeartFill } from "react-bootstrap-icons";

export default function CardsStats({ dataCard }) {
  const card = [
    {
      'title': 'TOTAL PRODUCTS',
      'stats': dataCard.ttProd ?? 0,
      'icon': <img className="w-12 h-auto" src="/images/icecream/icecream_icon.png" alt="icon" />
    }, {
      'title': 'TOTAL QUANTITY',
      'stats': dataCard.ttQuantity ?? 0,
      'icon': <Cart3 className="w-12 h-auto" />
    }, {
      'title': 'TOTAL REVENUE',
      'stats': "$" + (dataCard.ttAmount ?? 0.00),
      'icon': <CurrencyDollar className="w-12 h-auto" />
    }, {
      'title': 'TOTAL LIKES',
      'stats': dataCard.ttFav ?? 0,
      'icon': <SuitHeartFill className="w-12 h-auto" />
    }
  ];

  return (
    <div className="px-14 pt-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {
          card.map((item, index) => (
            <div key={index} className="p-4 bg-cream-100 border border-cream-300 rounded-lg shadow hover:shadow-md">
              <div className="flex flex-row items-center">
                <div className="flex-1 text-left md:text-left">
                  <h2 className="mb-2 text-lg font-bold text-cream-600 uppercase">{item.title}</h2>
                  <p className="mb-2 text-lg font-medium text-gray-600">{item.stats}</p>
                </div>
                <div className="flex-shrink">
                  <div className="flex items-center pl-8 pr-2 py-4 text-cream-500">
                    <span className="inline-block mr-3">
                      {item.icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}