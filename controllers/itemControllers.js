const Item = require('../models/Item');

//get all the items from database and sort them in decreasing order by date added. We then return these items in JSON format.
// this is a function
module.exports.get_items = (req,res) => {
    Item.find(sort({date:-1}).then(items => res.json(items)));
}

// We then save the item in the database and send the new item as the response in JSON format
module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    newItem.save().then(item => res.json(item));
}

//We will use the functionfindByIdAndUpdateto search for the item and update it with the new information. We then send the updated item as the response
module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({_id:req.params.id})
    .then(function(item){
        res.json(item);
    })

}

// We receive the item id through the params. Next, we find the item and delete it using findByIdAndDelete function.

module.exports.delete_items = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id})
    .then(function(item){
        res.json({success: true});
    });
}

