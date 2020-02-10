class Population
{
    constructor(phrase, m, numberOfPopulation)
    {
        this.population = []; //array for current population
        this.generations = 0; // number of generations
        this.finished = false; // are we done with evolution? 
        this.target = phrase; // which phrase we are looking for 
        this.mutationRate = m; // paarameter for mutation 
        this.perfectScore = 1; // the score we are looking for 
        this.best = ""; 
        
// create and arrac of genes, equal to length of the phrase we are searching for
        for ( let i=0; i<numberOfPopulation; i++)
        {
            this.population[i] = new DNA(this.target.length);
        }       
    }    
    
// calculate fitness for each component of population 
    calcFitness()
    {
        for(let i=0; i< this.population.length; i++)
        {
            this.population[i].calculateFitness(this.target);           
        }
    }
    generate()
    {
        let maxFitness =0; //help var to see highest fitness

        // length because we need to make new population of same size, and we pick
        // 2 parents randomly
        for(let i=0;i<this.population.length; i++) 
        {
            if(this.population[i].fitness > maxFitness)
            //set highest fitness in max fitness of generation
            {
                maxFitness = this.population[i].fitness;
            }
        }     
        for ( let i=0; i< this.population.length; i++)
        {          
            let partnerA = this.acceptReject(maxFitness);              
            let partnerB = this.acceptReject(maxFitness);
            let child = partnerA.crossover(partnerB);
            child.mutation(this.mutationRate);
            child.calculateFitness(this.target);
            this.population[i]=child;
        }
        this.generations +=1; 
    }

    acceptReject(maxFitness)
    {
        let beSafe =0;
        while(true){
             // pick random parent i.e. its index
            var index = Math.floor(Math.random() * this.population.length);
            var r = Math.random() * maxFitness; 
            var partner = this.population[index];       
            if( r < partner.fitness ) 
            {
                return partner;
            }   
            beSafe++;
            if(beSafe > 10000) {
                return null;} // in case of infinite loop (shouldn't be the case but stil)       
        }
    }

    getBest() 
    {
        return this.best;
    }

    evaluate() // to chech should we continue with evolution or not 
    {
        let record = 0;
        let index =0;
        var i =0;
        for (i=0; i < this.population.length; i++)
        {
            if (this.population[i].fitness > record)
            {
                index = i;
                record = this.population[i].fitness;              
            }
        }     
        this.best = this.population[index].getPhrase();    
        if(record == this.perfectScore) // if record/fitness which we set equal to 1
        {
            this.finished = true; // finish
        }      
    }
   
    isFinished()
    {
        return this.finished;
    }

    getGenerations()
    { return this.generations;}

    getAverageFitnessForThePopulation()
    {
        let total =0;
        for ( let i=0; i< this.population.length; i++)
        {
            total += this.population[i].fitness;
        }

        return total/(this.population.length);
    }
 // not used 
    allPhrases() 
    {
        let everything = "";
        let displayLimit = 10;

        for ( let i=0; i< displayLimit; i++)
        {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }
}
