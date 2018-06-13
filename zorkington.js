// zork = {
     
// }

let currentRoom = "182 Main st."

console.log(currentRoom +"\nYou are standing on Main Street between Church and South Winooski. There is a door here. A keypad sits on the handle. On the door is a handwritten sign.")

process.stdin.on('data', (chunk) => {
    let action = chunk.toString().trim();
    if (action == "read sign") {
        console.log('The sign says "Welcome to Burlington Code Academy! Come on up to the second floor. If the door is locked, use the code 12345.')
    }
});

// function moveToRoom(newRoom) {
//     if (canMoveToRoom(newRoom)) {
//       currentRoom = newRoom;
//     }
//   }

// let move = function () {
//     return {
//         room: function () {

//         }



//     }
// }