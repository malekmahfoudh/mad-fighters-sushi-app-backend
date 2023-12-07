//generate random number based on the time stamp and the available characters
export function orderNumberGen(digits){
    const availableChars = '1234567890ABCDEFGHIJKLMNOPQR';
    const dateStamp = Date.now().toString().slice(-4);
    const sumString = dateStamp + availableChars; 
    let result = ''; 
    for (let i = 0; i < digits; i++) {
        const randomNum = Math.floor(Math.random() * availableChars.length); 
        result += sumString[randomNum];
    }
    return  result;
}

 