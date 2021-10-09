const Stripe = require("stripe")

const stripe = new Stripe(process.env.PRIVATE_STRIPE_KEY)

module.exports.pay = async (req, res, next) => {
    try {
        const { id, amount } = req.body;

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "EUR",
            description: "Pago reserva de fecha de celebración",
            payment_method: id,
            confirm: true
        })

        res.send({
            message: "Has pagado correctamente, ve a tu perfil para ver tu reserva"
        })

    } catch (error) {
        res.send({
            errorMessage: "Hubo un problema con el pago, contacte con la empresa"
        })
    }
}