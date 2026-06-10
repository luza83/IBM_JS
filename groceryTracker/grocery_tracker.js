
let groceries = ["g1","g2","g3"]
let total =0
function calculateTotal() {
    for(let i =0; i < groceries.length; i++){
        console.log(groceries[i])
        total += parseFloat(document.getElementById(groceries[i]).value);
    }
   
   document.getElementById('result').innerText = `The total amount is: ${total}`;
}