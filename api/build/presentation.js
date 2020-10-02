"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clientController = clientController;

var _express = require("express");

function clientController(service) {
    var client = (0, _express.Router)();

    client.get("/clients", async function (req, res) {
        var page = parseInt(req.query.page, 10) || 1;
        var limit = parseInt(req.query.limit, 10) || 20;
        res.status(200).send((await service.getAllWithPaginator(page, limit)));
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
        var user = req.body.user;
        var id = req.params.id;

        try {
            await service.update(id, user);
            res.send("The client has been updated");
        } catch (error) {
            res.status(400).send("This user does not exist");
        }
    });

    return client;
}