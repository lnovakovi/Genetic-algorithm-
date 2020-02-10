class Population
{
    constructor(phrase, m, numberOfPopulation)
    {
        this.population = []; //niz za trenutnu populacije
        this.generations = 0; // broj generacije
        this.finished = false; // jesmo li zavrsili razvijati se
        this.target = phrase; // koji izraz nam je cilj
        this.mutationRate = m; // parametar za mutaciju
        this.perfectScore = 1; // rezultat koji trazimo
        this.best = ""; 
        
// stvori niz gena duljine fraze koju trazimo
        for ( let i=0; i<numberOfPopulation; i++)
        {
            this.population[i] = new DNA(this.target.length);
        }       
    }    
    
// izracunaj fitness za svaki clan populacije
    calcFitness()
    {
        for(let i=0; i< this.population.length; i++)
        {
            this.population[i].calculateFitness(this.target);           
        }
    }
    generate()
    {
        let maxFitness =0; //pomocna var za viditi najveci fitness
        for(let i=0;i<this.population.length; i++) 
        //prolazimo za duzinu populacije jer triba stvoriti novu pop
        // jednakog broja i biramo 2 roditelja slucajno
        {
            if(this.population[i].fitness > maxFitness)
            //postavi najveci fitness u max fitness generacije
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
             // izabrali random partnera tj njegov index
            var index = Math.floor(Math.random() * this.population.length);
            var r = Math.random() * maxFitness; 
            var partner = this.population[index];       
            if( r < partner.fitness ) 
            {
                return partner;
            }   
            beSafe++;
            if(beSafe > 10000) {
                return null;} // u slucaju da upadne u beskonacnu petlju(nebi smjelo)       
        }
    }

    getBest() 
    {
        return this.best;
    }

    evaluate() // metoda koja provjerava hoćemo li nastaviti razvijanje ili ne
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
        if(record == this.perfectScore) // ako je rekord (tj fitness koji smo postavili jednak 1)
        {
            this.finished = true; // zavrsi pretragu
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
 // ne koristi se
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
