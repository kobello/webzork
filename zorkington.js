rooms = {
    "182 Main st.": "You are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.",
    'Foyer': "You are in a foyer. Or maybe it\'s an antechamber. Or a vestibule. Or an entryway. Or an atrium. Or a narthex. But let\'s forget all that fancy flatlander vocabulary, and just call it a foyer. In Vermont, this is pronounced 'FO-ee-yurr'. A copy of Seven Days lies in a corner."
}

let currentRoom = "182 Main st."
let key = "12345"
let doorLocked = true
let playerInventory = []
let foyerInventory = ['SevenDays']

console.log(currentRoom + "\nYou are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.")

process.stdin.on('data', (chunk) => {
    let action = chunk.toString().trim();
    console.log("\n")
    if (currentRoom == '182 Main st.') {
        if (action == "read sign") {
            console.log('The sign says "Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code 12345."')
        } else if (action == "take sign") {
            console.log("That would be selfish. How will other students find their way?")
        } else if (action == "open door") {
            if (doorLocked) {
                console.log('The door is locked. There is a keypad on the handle.')
                // } else {
                //     console.log('Success! The door opens. You enter the foyer and the door shuts behind you.')
                // }
            }
        } else if (action.startsWith('key in') || action.startsWith('enter code')) {
            // keyRe = /[1-9]+/
            if (key == action.match('12345')) {
                // action == 'key in 12345' || action == 'enter code 12345')


                console.log('Success! The door opens. You enter the foyer and the door shuts behind you.')
                doorLocked = false
                moveToRoom("Foyer")
            } else {
                console.log('Bzzzzt! The door is still locked.')
            }
        } else {
            console.log("Sorry, I don't know how to " + action + ".")
        }
    } else if (currentRoom == 'Foyer') {
        if (action == "take seven days" || action == 'take paper') {
            console.log("You pick up the paper and leaf through it looking for comics and ignoring the articles, just like everybody else does.")
           playerInventory.push(foyerInventory.pop())
           console.log(playerInventory) 
        } else {
            console.log("Sorry, I don't know how to " + action + ".")
        }
    }
    console.log(currentRoom)
});



function moveToRoom(newRoom) {
    // if (canMoveToRoom(newRoom)) {
    currentRoom = newRoom;
    console.log('\nCurrent room: ' + currentRoom + "\n" + rooms[currentRoom])
    // }
}

// let move = function () {
//     return {
//         room: function () {

//         }



//     }
// }