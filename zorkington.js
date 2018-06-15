let rooms = {
    "182 Main st.": {
        'description': "You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.",
        'inventory':['dog poop', 'quarter'],
    },
    'Foyer': { 
        'description': "You are in a foyer. Or maybe it\'s an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner.",
        'inventory':['Seven Days']
    }
}

let items = {
    'Seven Days': "Vermont's Alt-Weekly",
    'dog poop': 'Brown. Smelly. Literal poop from a dog. I don\'t know what you were expecting.',
    'quarter': 'SWEET! 25 CENTS!',
    }

let currentRoom = "182 Main st."
let key = "12345"
let doorLocked = true
let playerInventory = []
// let oneEightTwoMain = []
// let foyerInventory = ['Seven Days']

moveToRoom("182 Main st.")

//console.log(currentRoom + "\nYou are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.")

process.stdin.on('data', (chunk) => {
    let action = chunk.toString().trim();
    console.log("\n")

    if (action == "i") {
        inventory()
    } else if (action == "look around") {
        console.log('' + rooms[currentRoom]['inventory'])
    }else if (currentRoom == '182 Main st.') {

        mainStActions(action);

    } else if (currentRoom == 'Foyer') {

        foyerActions(action);
    }
    console.log(currentRoom)
});

function take(itemFromAction) {
    if (rooms[currentRoom]["inventory"].includes(itemFromAction)) {
        playerInventory.push(rooms[currentRoom]["inventory"].splice(itemFromAction).toString())
        console.log(playerInventory)
    } else {
        console.log("I can't take that now.")
        console.log("" + rooms[currentRoom]["inventory"])
    }
}

function foyerActions(action) {
    if (action == "drop paper" || action == "drop seven days") {
        if (playerInventory != 0) {
            rooms['Foyer']['inventory'].push(playerInventory.pop());
            console.log("The copy of Seven Days is removed from the player's inventory");
        }
        else {
            console.log("There's nothing in your inventory!");
        }
    } else if (action == "take seven days" || action == 'take paper') {
        take('Seven Days')
        // if (rooms['Foyer']['inventory'].length != 0) {
        //     console.log("You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.");
        //     playerInventory.push(rooms['Foyer']['inventory'].pop());
        //     console.log(playerInventory);
        // }
        // else {
        //     console.log("You already picked that up!");
        // }
    } else {
        console.log("Sorry, I don't know how to " + action + ".");
    }
}

function mainStActions(action) {
    if (action == "drop paper" || action == "drop seven days") {
        if (playerInventory != 0) {
            rooms['182 Main st.']['inventory'].push(playerInventory.pop())
            console.log("The copy of Seven Days is removed from the player's inventory")
        } else {
            console.log("There's nothing in your inventory!")
        }
    } else if (action == "take seven days" || action == 'take paper') {
        take('Seven Days')
    } else if (action == "read sign") {
        console.log('The sign says "Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code 12345."');
    } else if (action == "take sign") {
        console.log("That would be selfish. How will other students find their way?");
    } else if (action == "open door") {
        if (doorLocked) {
            console.log('The door is locked. There is a keypad on the handle.');
            // } else {
            //     console.log('Success! The door opens. You enter the foyer and the door shuts behind you.')
            // }
        }
    } else if (action.startsWith('key in') || action.startsWith('enter code')) {
        // keyRe = /[1-9]+/
        if (key == action.match('12345')) {
            // action == 'key in 12345' || action == 'enter code 12345')
            console.log('Success! The door opens. You enter the foyer and the door shuts behind you.');
            doorLocked = false;
            moveToRoom("Foyer");
        } else {
            console.log('Bzzzzt! The door is still locked.');
        }
    } else {
        console.log("Sorry, I don't know how to " + action + ".");
    }
}

function moveToRoom(newRoom) {
    // if (canMoveToRoom(newRoom)) {
    currentRoom = newRoom;
    console.log('\nCurrent room: ' + currentRoom + "\n" + rooms[currentRoom]['description'])
    // }
}

function inventory() {
    if (playerInventory.length <= 0) {
        console.log("You are not carrying anything!")
    } else {
        console.log('You are carrying:')
        for (let item of playerInventory) {
            console.log(item + ", " + items[item])
        }
    }
}

// let move = function () {
//     return {
//         room: function () {

//         }



//     }
// }