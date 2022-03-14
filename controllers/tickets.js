
const Ticket = require('../models/ticket');


function newTicket(req, res) {
    res.render('flights/newticket', {flightId: req.params.id})
}


async function addTicket(req, res) {
    req.body.flight = req.params.id;
    await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.id}`);
}

module.exports ={
    add: addTicket,
    new: newTicket
}