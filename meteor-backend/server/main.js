

// declare MongoDB collection here
//
// Read more: http://guide.meteor.com/collections.html
const Todo = new Meteor.Collection('todo');
//game holds the whole gameworld, divided into cells. Each cell has a "type", "texture", and "contents".
const Game = new Meteor.Collection('game');
//Holds info for all "Actors" (players, monsters, and NPCs)
const Actor = new Meteor.Collection('actor');
//holds all pending actions for the next tick in the game loop
let Actions = [];
Actor.schema = new SimpleSchema({
    name: {type: String},
    type: {type: String},
    owner: {type: String, defaultValue: '-1'}, //negative owner value indicates an NPC
    velX: {type: Number, defaultValue: 0},
    velY: {type: Number, defaultValue: 0}, 
    posX: {type: Number, defaultValue: 0},
    posY: {type: Number, defaultValue: 0},
    health:{type: Number, defaultValue: 100},
    speed:{type: Number, defaultValue: 10},
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
    addActor(name, owner){
        return Actor.insert({name: name, owner: owner, health: 100, speed:10, type: "testActor", velX: 0, velY: 0, posX: 0, posY: 0, })
    },
     removeActor(id) {
        return Actor.remove({_id: id});
    },

    gameLoop() {
        //implement server loop to consolidate update operations and give a "tickrate"
        return
    },
    addActorVelocity(id, directionX, directionY) {
        
        //todo: check that player is owned by current user
        //todo: ensure that player is not moving faster than their max move speed
        //possibly take a direction and calculate the speed entirely serverside

        //ensure directions are either -1, 0, or 1
        let checkDirection = function (direction) {
            if (direction > 0) {
                direction = 1;
            }
             if (direction < 0) {
                direction = -1;
            }
             if (direction == 0) {
                direction = 0;
            }
            return direction;
        }
        directionX = checkDirection(directionX);
        directionY = checkDirection(directionY);
       
               
          
        var actor = Actor.findOne({_id: id});
        return Actor.update({_id: id}, {$inc: {velX: actor.speed * directionX , velY: actor.speed * directionY}});
    },
    stopMovingActor(id) {
        return Actor.update({_id: id}, {$set: {velX: 0, velY: 0}});
    }
});

//Startup scripts
import {setGameLoop, clearGameLoop} from './imports/startup/gameloop.js';

let frameCount = 0

let gameLoop = setGameLoop(Meteor.bindEnvironment(function(delta){
    actorCollection = Actor.rawCollection();
    let bulk = actorCollection.initializeUnorderedBulkOp();
    let actors = Actor.find();
    actors.forEach(function(actor) {
        console.log("On actor:");
        console.log(actor);
        newX = actor.posX + actor.velX;
        newY = actor.posY + actor.velY;
        bulk.find({_id: actor._id}).update({posX: newX, posY: newY});
    });
    let result = Meteor.wrapAsync(bulk.execute)();
    console.log(result);
    console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
    //update each actor according to it's current velocity
    //is it possible to do it all in one operation so we can return the updated state all at once?
    //one approach here: https://stackoverflow.com/questions/19223085/meteor-server-side-bulk-database-changes
    // mongodb bulk looks like a better approachhttps://docs.mongodb.com/v3.0/reference/method/Bulk.find.update/#Bulk.find.update
}), 60);

// stop the loop 2 seconds later
Meteor.setTimeout(Meteor.bindEnvironment(function() {
    console.log('2000ms passed, stopping the game loop');
    clearGameLoop(gameLoop);
}), 2000);

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