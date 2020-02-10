$(document).ready(function() { //JQuery detects state of document

    var population;
    var target;
    var popmax;
    var mutationRate;
    var averageFitness;
    var br = localStorage.length; //brojac koji će mi biti key u spremanju podataka
    var isPossibleToSave = false; // da se ne spremi prazan podatak

    document.getElementById("kreni").addEventListener("click",Go);    
    document.getElementById("spremi").addEventListener("click", SaveData);

    function Go()
    {
        if(!ValidateForm())
        {
           return;
        }    
        target = document.getElementById("fraza").value;
        document.getElementById("trazeno").innerHTML = target;
        mutationRate =document.getElementById("parametar").value;    
        popmax = document.getElementById("brojPopulacije").value;
        population= new Population(target,mutationRate,popmax);   

        while(!population.isFinished())
        {
            population.calcFitness();       
            population.generate(); 
            population.evaluate();
            console.log("jos radim");
                   
            DisplayInfo();    
        }
        isPossibleToSave = true;
        document.getElementById("fraza").value= "";
        document.getElementById("parametar").value ="";
        document.getElementById("brojPopulacije").value ="";

        
    }

    function DisplayInfo()
    {
        $("#najFraza").html(population.getBest());
        $("#brojPop").html(population.getGenerations());
        averageFitness=Math.floor(population.getAverageFitnessForThePopulation()*100) + "%";
        $("#fitness").html(averageFitness);
        $("#parametarMutacije").html(mutationRate);
        $("#total").html(popmax);
        $("#sve").html(population.allPhrases());  
    }
    function SaveData()
    {
        if(!isPossibleToSave)
        {
            return;
        }
        br++;
        let savePopulation = population.getGenerations();
        let saveFraze=target;
        let totalPopulation = popmax;
        var dataToSave={"phrase":saveFraze,"population":savePopulation,"totalPopulation":totalPopulation,"averageFitness":averageFitness}; //objekt
        var mojJSON = JSON.stringify(dataToSave); // pretvorimo u string
        localStorage.setItem(br,mojJSON);  // br je key , string je value
        isPossibleToSave = false;
    }

    function ValidateForm()
    {
        a=document.getElementById("fraza").value;
        b=document.getElementById("brojPopulacije").value;
        c=document.getElementById("parametar").value;
        if(CheckForNumber(a))
        {
            alert("No numbers in phrase please.")
            return;
        }
        if(a == "" || a==null || b=="" || b==null || c>=1 || c<=0 || c=="" || c== null)
        {
            window.alert("Wrong input for mutation rate or num. of pop");
            return false;
        }
        return true;
    }
    
    function CheckForNumber(inputToCheck)
    {
        return /\d/.test(inputToCheck); // /\d/ regex matches digit [0-9], test f-ja provjerava ima li brojeva u frazi, vraća true/false
    }
   
}); 