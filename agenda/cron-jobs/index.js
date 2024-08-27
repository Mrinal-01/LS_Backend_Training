module.exports = async (agenda) => {
  // Cron job for calculating months of experience of a candidate
  await agenda.cancel({ name: "demo" })
  await agenda.create("demo")
    .repeatEvery("1 day")
    .schedule("11:59pm")
    .save()


    await agenda.cancel({name: 'log server restart'})
    await agenda.create("log server restart")
    .repeatEvery('10 hours')
    .save()


    await agenda.cancel({name:"delayed job"})
    await agenda.create("delayed job").schedule("10 hours").save()

    async function listJobs() {
      const jobs = await agenda.jobs({});
      jobs.forEach((job) => {
        console.log(
          `Job ID: ${job.attrs._id}, Name: ${
            job.attrs.name
          }, Data: ${JSON.stringify(job.attrs.data)}`
        );
      });
    }
    
    listJobs();
}
