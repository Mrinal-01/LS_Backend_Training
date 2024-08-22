const User=require('../models/user/index')

module.exports = (agenda) => {
  agenda.define("demo", {priority:-20},async (job) => {
    try {
      job.remove();
    } catch (error) {
      console.log(`Agenda => ${error}`);
      job.remove();
    }
  })
 
  agenda.define("log server restart",{priority:10},async () => {

    await User.updateMany({},{$set:{updatedAt:new Date()}})
    const isoDateString = new Date(Date.now()).toISOString()
    console.log("Hello Mrinal, Server restarted. Date&TIme:",isoDateString)
    // done();
  })

  agenda.define("delayed job",{priority:20},async()=>{
    console.log("This job was delayed by 30 seconds.");
    
  })

};

