function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min; 
    // method for returning random number from range [min,max] 
  }

function newChar()
{ // this method is just to include some punctations which is not in range defined
    // so changed unnecesarcy character with most used 
    var c =getRndInteger(62,123); 
    
    if (c == 62) // if '<'
    { c=32;} // be space
    if(c==64) // if '@'
    {c=46;} // be '.' 
    if(c==123) // if '('
    {c=33;} // be '!'
    return String.fromCharCode(c);
}
class DNA 
{
    constructor(num) // receives number how long gene is going to be 
    {
        this.genes = [];
        this.fitness =0;
        for(let i = 0 ; i< num; i++)
        {
            this.genes[i] = newChar();
        }    
    }
    
    getPhrase() 
    { return this.genes.join("");} // change char array to string

    calculateFitness(target) // calculate fitness, receives target value 
    {
        let score = 0;
        for ( let i=0; i < this.genes.length; i++)
        {
            if(this.genes[i] == target.charAt(i))
            {
                score ++; // increase score if any character is matched
            }          
        }
        this.fitness = score/target.length ; // to have percentage
        this.fitness = Math.pow(this.fitness,2);
    }

    crossover(partner) //partner for crossover
    {
        //new child
        let child = new DNA(this.genes.length);
        // pick midpoint for crossover
        let midpoint = Math.floor(Math.random() * this.genes.length);
        //part of first parent, part of other parent 
        for (let i=0; i<this.genes.length; i++)
        {
            if (i > midpoint) 
            {
                child.genes[i] = this.genes[i]; // part of the parent on which we call the method
            }
            else 
            {
                child.genes[i] = partner.genes[i]; // part of parent we use for crossover 
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
