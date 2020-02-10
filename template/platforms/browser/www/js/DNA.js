function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min; 
    // random metoda koja ukljucuje min i max 
  }

function newChar()
{
    var c =getRndInteger(62,123); //63 je upitnik
    
    if (c == 62) // ako je <
    { c=32;} // budi space
    if(c==64) // ako je @
    {c=46;} // budi tocka 
    if(c==123) // ako je (
    {c=33;} // budi usklicnik
    return String.fromCharCode(c);
}
class DNA 
{
    constructor(num) // prima broj koje ce duljine gen biti
    {
        this.genes = [];
        this.fitness =0;
        for(let i = 0 ; i< num; i++)
        {
            this.genes[i] = newChar();
        }    
    }
    
    getPhrase() 
    { return this.genes.join("");} // pretvara char niz u string

    calculateFitness(target) //metoda koja racuna fitness, kao parametar prima cilj
    {
        let score = 0;
        for ( let i=0; i < this.genes.length; i++)
        {
            if(this.genes[i] == target.charAt(i))
            {
                score ++; // povećaj score
            } //ako je pogođeno koje slovo/razmak/znak            
        }
        this.fitness = score/target.length ; // radi postotka
        this.fitness = Math.pow(this.fitness,2);
    }

    crossover(partner) //prima partnera s kojim se dogada crossover
    {
        //novo dijete
        let child = new DNA(this.genes.length);
        // izaberi tocku(midpoint) koja ce bit granica jednog roditelja
        // pocetak drugog u crossoveru u novom genu
        let midpoint = Math.floor(Math.random() * this.genes.length);
        //dio jednog roditelja,pola drugog
        for (let i=0; i<this.genes.length; i++)
        {
            if (i > midpoint) 
            {
                child.genes[i] = this.genes[i]; // dio roditelja nad kojim se pozvala metoda
            }
            else 
            {
                child.genes[i] = partner.genes[i]; // dio roditelja s kojim radimo crossover
            }
        }
        return child;
    }

    mutation(mutationRate)
    {
        for( let i=0; i< this.genes.length; i++)
        {
            if( Math.random() < mutationRate)
            {               
                this.genes[i] = newChar();
            }
        }
    }
}
