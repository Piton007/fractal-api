"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clientController = clientController;

var _express = require("express");

function clientController(service) {
    var client = (0, _express.Router)();

    client.get("/clients", async function (req, res) {
        res.status(200).send((await service.getAll()));
    });

    client.post("/clients", async function (req, res) {
        var user = req.body;

        try {
            await service.add(user);
            res.send("The client has been created");
        } catch (error) {
            res.status(400).send(e);
        }
    });
    client.put("/clients/:id", async function (req, res) {
        var user = req.body;
        var id = req.params.id;

        try {

            res.send((await service.update(id, user)));
        } catch (error) {
            console.log(error);
            res.status(400).send("This user does not exist");
        }
    });

    return client;
}