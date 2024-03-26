export const PLANS =[
    {
        name: "Free",
        slug: 'free',
        quota: 10,
        pagesPerPdf: 5,
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: '',
            }
        }
    },
    {
        name: "Pro",
        slug: 'pro',
        quota: 50,
        pagesPerPdf: 25,
        price: {
            amount: 14,
            priceIds: {
                test: 'price_1Oy5eVAaHYxVhgRyrcrj9cJg',
                production: '',
            }
        }
    },
    {
        name: "Enterprise",
        slug: 'enterprise',
        quota: 1000,
        pagesPerPdf: 250,
        price: {
          amount: 485,
          priceIds: {
            test: 'price_1OyJJIAaHYxVhgRyHO7c0nNi',
            production: '',
          }
        }
      }
]
