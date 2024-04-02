export const PLANS =[
    {
        name: "Free",
        slug: 'free',
        quota: 1,
        pagesPerPdf: 20,
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
        quota: 750,
        pagesPerPdf: 2000,
        price: {
            amount: 9.99,
            priceIds: {
                test: 'price_1P103uAaHYxVhgRyHLKTHcYV',
                production: '',
            }
        }
    }
]
