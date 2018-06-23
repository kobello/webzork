// change 'Foyer' to '182 main st - foyer'
// when an empty string is input, give it a message other than "sorry i dont know how to "
// add more words to open inventory. synonyms.
// 


let rooms = {
    "182 Main st.": {
        canChangeTo: ["182 Main St. - Foyer"],
        'description': "You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.",
        'inventory': ['dog poop', 'quarter'],
    },
    '182 Main St. - Foyer': {
        canChangeTo: ["182 Main st."],
        'description': "You are in a foyer. Or maybe it\'s an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner. A set of stairs leads up to another floor. A door leads outside.",
        'inventory': ['Seven Days']
    }
}

potentialCommands = {
    pickUpPaper: ['Pick up paper', 'pick up paper', 'take paper', 'Take paper', 'Grab paper', 'grab paper', 'get paper', 'Get paper', 'Pick up seven days', 'pick up seven days', 'take seven days', 'Take seven days', 'Grab seven days', 'grab seven days', 'get seven days', 'Get seven days'],
    drop: ['drop', 'Drop', 'Put down', 'put down', 'throw away', 'Throw away'],
    lookAt: ['Look at', 'Look', 'look', 'look at', 'examine', 'Examine'],
    checkInventory: ['i', 'I', 'Inventory','inventory', 'take inventory', 'Take inventory']
}

let items = {
    'Seven Days': {
        'description': "Vermont's Alt-Weekly",
        'onPickUp': 'You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.'
            },
    'dog poop': {
        'description': 'Brown. Smelly. Literal poop from a dog. I don\'t know what you were expecting.',
        'onPickUp': 'squish...',
    },
    'quarter':{
        'description': '25 cents. Minted 1978. How is this still around?',
        'onPickUp': 'SWEET! 25 CENTS!'
    }
}

let playerInput = function (rawInput) {
    let input = rawInput.toString().trim().toUpperCase();
}


let currentRoom = "182 Main st."
let key = "12345"
let doorLocked = true
let playerInventory = []

say(currentRoom + "\n" + rooms[currentRoom]["description"])
;

function start (playerInput) {
    let input = document.getElementById('input');
    input.innerHTML = string
}


function say (string) {
    let output = document.getElementById('output');
    output.innerHTML = '<br>' + string + '<br>';
    if (potentialCommands.checkInventory.includes(playerInput)) {
        inventory()
    } else if (playerInput == "look around") {
        say(rooms[currentRoom]["description"] + " You see " + rooms[currentRoom]['inventory'] + ".")
    } else if (currentRoom == "182 Main st.") {

        mainStActions(playerInput);

    } else if (currentRoom = "182 Main St. - Foyer") {

        foyerActions(playerInput);
    }
    say(currentRoom)
};

let changeRoom = function changeRoom(newRoom) {
    let validTransitions = rooms[currentRoom].canChangeTo;
    if (validTransitions.includes(newRoom)) {
        currentRoom = newRoom;
        say('\nCurrent room: ' + currentRoom + "\n" + rooms[currentRoom]['description'] + "\n")
    } else {
        say("Invalid state transition attempted - from " + currentRoom + " to " + newRoom);
    }
}

function take(itemFromAction) {
    if (rooms[currentRoom]["inventory"].includes(itemFromAction)) {
        let itemIndex = rooms[currentRoom]["inventory"].indexOf(itemFromAction)
        let item = rooms[currentRoom]["inventory"].splice(itemIndex, 1).toString()
        playerInventory.push(item)
        say(items[item]['onPickUp'])
    } else {
        say("I can't take that now.")
    }
}

function mainStActions(playerInput) {
    if (playerInput == "drop paper" || playerInput == "drop seven days") {
        drop("Seven Days")
    } else if (potentialCommands.pickUpPaper.includes(playerInput)) {
        take('Seven Days')
        
    } else if (playerInput == "read sign") {
        say('The sign says "Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code 12345."');
    } else if (playerInput == "take sign") {
        say("That would be selfish. How will other students find their way?");
    } else if (playerInput == "open door") {
        if (doorLocked) {
            say('The door is locked. There is a keypad on the handle.');
        }
    } else if (playerInput('key in') || playerInput('enter code')) {
        if (key == playerInput.match('12345')) {
            say('Success! The door opens. You enter the foyer and the door shuts behind you.');
            doorLocked = false;
            changeRoom("182 Main St. - Foyer");
        } else {
            say('Bzzzzt! The door is still locked.');
        }
    } else {
        say("Sorry, I don't know how to " + playerInput + ".");
    }
}

function foyerActions(playerInput) {
    if (playerInput == "drop paper" || playerInput == "drop seven days") {
        drop("Seven Days")
    } else if (potentialCommands.pickUpPaper.includes(playerInput)) {
        take('Seven Days')
    } else if (playerInput == "go back") {
        changeRoom("182 Main st.")
    } else {
        say("Sorry, I don't know how to " + playerInput + ".");
    }
}

function inventory() {
    if (playerInventory.length <= 0) {
        say("You are not carrying anything!")
    } else {
        say('You are carrying:')
        for (let item of playerInventory) {
            say(item + ", " + items[item]['description'])
        }
    }
}       

function drop(itemFromAction) {
    if (playerInventory.includes(itemFromAction)) {
        let itemIndex = playerInventory.indexOf(itemFromAction)
        let item = playerInventory.splice(itemIndex, 1).toString()
        rooms[currentRoom]["inventory"].push(item)
        say("You dropped " + item)
    } else {
        say("I can't drop that now.")
    }
}

// function take(desiredItem) {
//     const roomInventory = rooms[currentRoom]['inventory'];

//     if (roomInventory.includes(desiredItem)) {

//         const itemFromRoom = roomInventory.splice(roomInventory.indexOf(desiredItem), 1).toString();
//     playerInventory.push(itemFromRoom)
//     say('' + desiredItem + ' was added to your inventory.')
//     } else {
//         say('There is no ' + desiredItem + ' here.')
//     }
    // while (rooms[currentRoom]['inventory'].length > rooms[currentRoom]['inventory'].indexOf(itemFromAction)){
    //     tempInventoryArray.push(rooms[currentRoom]['inventory'].pop())
    //     say(tempInventoryArray)
    // }
    // playerInventory.push(tempInventoryArray.pop())
    // while (tempInventoryArray.length > 0) {
    //     rooms[currentRoom]['inventory'].push(tempInventoryArray.pop())
    //     say()
    // }
// }