// declare MongoDB collection here
//
// Read more: http://guide.meteor.com/collections.html
const Todo = new Meteor.Collection('todo');
//game holds the whole gameworld, divided into cells. Each cell has a "type", "texture", and "contents".
const Game = new Meteor.Collection('game');
//Holds info for all "Actors" (players, monsters, and NPCs)
const Actor = new Meteor.Collection('actor');

Actor.schema = new SimpleSchema({
    name: {type: String},
    type: {type: String},
    owner: {type: Number, defaultValue: -1}, //negative owner value indicates an NPC
    posX: {type: Number, defaultValue: 0},
    posY: {type: Number, defaultValue: 0},
    health:{type: Number, defaultValue: 100},
    skills: {type: [Object], defaultValue: []},
    inventory: {type: [Object], defaultValue: []},
});

Actor.attachSchema(Actor.schema);
// We can publish some data (here all)
// we will be able to subscribe to the data later in the client app
// remember that this is not secured, all can subscribe to all data from the client side, just demo purposes
//
// Read more: http://guide.meteor.com/data-loading.html
Meteor.publish('todo', function () {
    return Todo.find();
});

Meteor.publish('world', function() {
    return World.find();
})
Meteor.publish('actor', function() {
    return Actor.find();
})
// We can also use server side methods and call them from our client app
// here we just fetch all documents from the collection
// again, remember that this is not secured, all can call it from the client side, just demo purposes
//
// Read more: http://guide.meteor.com/methods.html
Meteor.methods({
    getTodo(id) {
        return Todo.findOne(id);
    },
    getTodos() {
        return Todo.find().fetch();
    },
    addTodo(message) {
        return Todo.insert({message: message});
    },
    removeTodo(id) {
        return Todo.remove({_id: id});
    },
    editTodo(id, finished) {
        return Todo.update({_id: id}, {$set: {finished: finished}});
    },
    getActor(id) {
        return Actor.findOne(id);
    },
    getActors() {
        return Actor.find().fetch();
    },
    addActor(name){
        return Actor.insert({name: name, health: 100, type: "testActor", posX: 0, posY: 0, })
    },
     removeActor(id) {
        return Actor.remove({_id: id});
    },
    moveActor(id, distanceX, distanceY) {
        //todo: check that player is owned by current user
        //todo: ensure that player is not moving faster than their max move speed
        //possibly take a direction and calculate the speed entirely serverside
        return Player.update({_id: id}, {inc: {posX: distanceX, posY: distanceY}});
    }
});


// Deny all client-side updates on the Lists collection
// Read more about security stuff: http://guide.meteor.com/security.html
Todo.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
Actor.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
}); 