

// declare MongoDB collection here
//
// Read more: http://guide.meteor.com/collections.html
const Todo = new Meteor.Collection('todo');
//game holds the whole gameworld, divided into cells. Each cell has a "type", "texture", and "contents".
const Game = new Meteor.Collection('game');
//Holds info for all "Actors" (players, monsters, and NPCs)
const Actor = new Meteor.Collection('actor');
//holds all pending actions for the next tick in the game loop
let actions = {};
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
        var actor = Actor.findOne({_id: id});
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
       
        let newVelX = (actor.speed * directionX);
        let newVelY = (actor.speed * directionY);

        let checkMaxSpeed = function (velocity) {
            if (velocity > actor.speed) {
                velocity = 0;
            }
            if (velocity < -actor.speed) {
                velocity = 0;
            }
            return velocity;
        }

        newVelX = checkMaxSpeed(newVelX);
        newVelY = checkMaxSpeed(newVelY)
               
          
        
        actions[id] = {_id: id, velX: newVelX, velY: newVelY};
        return actions[id];
        //return Actor.update({_id: id}, {$set: {velX: newVelX , velY: newVelY}});
    },
    stopActor(id, shouldStopX, shouldStopY) {

        if (shouldStopX === true && shouldStopY === true) {
            actions[id] = Object.assign({}, actions[id], {_id: id, velX: 0, velY: 0})
            return actions[id];                
        }
        else if (shouldStopY === true) {
            actions[id] = Object.assign({}, actions[id], {_id: id, velY: 0})
            return actions[id]; 
        }
        else if (shouldStopX === true) {
            actions[id] = Object.assign({}, actions[id], {_id: id, velX: 0})
            return actions[id]; 
        }


        
    }
});

//Startup scripts
import {setGameLoop, clearGameLoop} from './imports/startup/gameloop.js';

let frameCount = 0

let gameLoop = setGameLoop(Meteor.bindEnvironment(function(delta){
    //get raw collection so we can call mongo operations like bulk directly
    actorCollection = Actor.rawCollection();
    //an Unordered Bulk Op will complete all operations even if one fails
    let bulk = actorCollection.initializeUnorderedBulkOp();

    //iterate over the actors to update their positions based on velocity
    let actors = Actor.find();
    let actorsHaveBeenMoved = false;
    actors.forEach(function(actor) {
        if (actions[actor._id]) {
            let action = actions[actor._id];
            let newX = actor.posX + action.velX;
            let newY = actor.posY + action.velY;

            bulk.find({_id: actor._id}).update({$set: {posX: newX, posY: newY}});
        
        
            

            actorsHaveBeenMoved = true;
        }
       
    });

    //use wrapAsync to make sure meteor knows what to do when this returns
    if (actorsHaveBeenMoved) {
         let result = Meteor.wrapAsync(bulk.execute)();
         //TODO: handle the errors better
        //console.log(result.toJSON());
    }
   
    //console.log('Hi there! (frame=%s, delta=%s)', frameCount++, delta);
    }), 20);



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