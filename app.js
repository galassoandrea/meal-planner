const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const breakfastStartingContent = [];
const lunchStartingContent = ["Milk", "Oatmeal", "Banana"];
const snackStartingContent = [];
const dinnerStartingContent = [];

app.get("/", function (req, res) {
    res.render("list", {
        lunchList: lunchStartingContent,
        dinnerList: dinnerStartingContent,
        breakfastList: breakfastStartingContent,
        snackList: snackStartingContent
    });
});

app.post("/", function (req, res) {
    const itemToAdd = req.body.item;
    const targetList = req.body.list;

    switch (targetList) {
        case "lunch":
            lunchStartingContent.push(itemToAdd);
            res.redirect("/");
            break;
        case "breakfast":
            breakfastStartingContent.push(itemToAdd);
            res.redirect("/");
            break;
        case "snack":
            snackStartingContent.push(itemToAdd);
            res.redirect("/");
            break;
        case "dinner":
            dinnerStartingContent.push(itemToAdd);
            res.redirect("/");
            break;
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});