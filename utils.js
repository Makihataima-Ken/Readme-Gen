function generateRandomNumber()
{
    return Math.floor(Math.random()*100)+1;
}
function celisiusToFahrenheit(celisius){
    return (celisius*9)/5+32;
}
module.exports={generateRandomNumber,celisiusToFahrenheit};