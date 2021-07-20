import Stripe from "stripe";
const stripe = new Stripe("sk_test_51J57niL9SJ0C1GoqOj6uSAl79iWHy8AMr2x6nW2z0ATXovDE3hexJjzZ2HqseGFW8155z6x1xKWMIPTWOdIuJhSE00na9l3j3z",{apiVersion:"2020-08-27"});

export const handler = async(event)=> {

    console.log(event);
    const {priceId} = JSON.parse(event.body);
    console.log(priceId);
    const session = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types:["card"],
        line_items:[
            {
                price:priceId,
                quantity:1,
            }
        ],
        success_url:"https://www.google.com",
        cancel_url:"https://www.facebook.com"
    })
    console.log("session",session)
    return {
        statusCode:200,
        body:JSON.stringify({
            url:session.url,
            status:true,
        })
    }

}
