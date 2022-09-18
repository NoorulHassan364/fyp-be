const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const collegeModel = require("../models/collgeModel");
const UserModel = require("../models/user");
const admissionModel = require("../models/admissionModel");


exports.getCheckOutSession = async (req, res, next) => {
    try {
        let college = await collegeModel.findById(req.params.collegeId);
        let user = await UserModel.findById(req.params.studentId);

        let admission = await admissionModel.create({ ...req.body, admissionFee: college?.admissionFee });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    unit_amount: college?.admissionFee,
                    product_data: {
                        name: `${college?.name}`,
                        description: 'Comfortable cotton t-shirt',
                        images: [college?.image],
                    },
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.SUCCESS_PAYMENT_URL}/${req.params.collegeId}`,
            cancel_url: `${process.env.CANCEL_PAYMENT_URL}/${req.params.collegeId}`,
            customer_email: user?.email,
            client_reference_id: admission?._id,
        });

        res.status(200).json({
            status: 'success',
            session
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
        })
    }
};

// exports.createCheckoutBooking = catchAsync(async (req, res, next) => {
//     console.log('i am called')
//     const { user, tour, price } = req.query;
//     if (!user && !tour && !price) return next();
//     await Booking.create({ tour, user, price });
//     res.redirect('http://localhost:3000/');
// })


const createCheckoutBooking = async (session) => {
    console.log("session", session)
    console.log("createCheckoutBooking called")
    let college = session.client_reference_id;
    let user = (await UserModel.findOne({ email: session.customer_email }));
    // console.log("session.line_items[0]", session.line_items[0])
    // console.log("session.line_items[0]", session.display_items[0])
    // const price = session.display_items[0].amount / 100;
    let price = session.amount_total;
    console.log("college user price", college, user, price)
    await admissionModel.findByIdAndUpdate({ paid: true });
}

exports.webhookCheckout = (req, res, next) => {
    console.log("i am called .....")
    let event;
    try {
        const signature = req.headers['stripe-signature'];
        console.log("signature", signature)
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            'whsec_rfVhkxQLglIK7VugDZ27Ym0pqPos6jN7'
        )
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`)
    }
    if (event.type === 'checkout.session.completed') {
        createCheckoutBooking(event.data.object)
    }
    res.status(200).json({ received: true })
}