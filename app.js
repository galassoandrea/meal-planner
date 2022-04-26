const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const breakfastStartingContent = ["1 glass of milk", "150 gr oatmeals", "1 banana"];
const lunchStartingContent = ["200 gr pasta", "50 gr tomato sauce", "1 glass of orange juice"];
const snackStartingContent = ["1 Sandwich", "1 Apple", "2 Walnuts"];
const dinnerStartingContent = ["250 gr chicken breast", "70 gr broccoli", "50 gr whole grain bread"];

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

    if (itemToAdd !== null && itemToAdd !== "") {
        
        /* Detecting to which list the element should be added */
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
    }
});

app.post("/delete", function (req, res) {
    const itemToDelete = req.body.checkbox;
    const targetList = req.body.list;

    /* Detecting from which list the element should be deleted */
    switch (targetList) {
        case "lunch":
            lunchStartingContent.splice(itemToDelete, 1);
            res.redirect("/");
            break;
        case "breakfast":
            breakfastStartingContent.splice(itemToDelete, 1);
            res.redirect("/");
            break;
        case "snack":
            snackStartingContent.splice(itemToDelete, 1);
            res.redirect("/");
            break;
        case "dinner":
            dinnerStartingContent.splice(itemToDelete, 1);
            res.redirect("/");
            break;
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});