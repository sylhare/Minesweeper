function Timer(){
    /* Create a timer to count the ellapsed time */
    var timer, time;
    
    function count(){
        
    }
     
    function start(){
        this.timer = SetInterval(count, 1000);
    }
    
    function stop(){
        clearInterval(timer);
    }
    
    function restart(){
    }
}